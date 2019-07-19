<template>
	<div class="layui-form content">
		<div class="spaceBetween">
			<div class="conditionInput" style="margin-top: 0px;">
				<label>要上传的图片的拍摄时间：</label>
				<div class="layui-input-inline" style="margin-right: 15px;">
					<input type="text" v-model="img_time" class="layui-input" style="height: 30px;width: 100px;padding-left: 18px;" id="img_time_select"
					 placeholder="请选择时间">
				</div>
				<button v-show="img_time.length == 10" class="layui-btn" style="background-color: #007DDB;height: 30px;line-height: 30px;border-radius: 6px;" :id="chooseImg_id">选择图片</button>
				 <button v-show="selectComplete" class="layui-btn" style="background-color: #007DDB;height: 30px;line-height: 30px;border-radius: 6px;" id="uploadAction">上传</button>

			</div>
			<div>
				<select class="layui-select" v-model="selected_time" lay-filter="selected_time" style="height: 30px;border-radius: 6px;">
					<option value="">请选择要查看的日期</option>
					<option v-for="item in time_list" :value="item">{{item}}</option>
				</select>
			</div>
		</div>

		<div v-show="img_list.length > 0" class="flexStart" style="margin-top: 10px;">
			<ul id="viewer_image_show">
				<li v-for="(item, index) in img_list" :key="index" style="position: relative;">
					<img :data-original="'http://dearsan.top/image/'+item" :src="'http://dearsan.top/thum/thum_'+item" />
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import Viewer from '../../static/viewer/viewer.js';
	import '../../static/viewer/viewer.css';

	export default {
		name: 'upload',
		data() {
			return {
				msg: "",
				file: '',
				showUpload: false,
				chooseImg_id: "chooseImg_upload",
				img_list: [],

				viewerId: null,
				ViewerDom: null,
				viewer: null,

				img_time: "",
				selected_time: "",
				time_list: [],
				selectComplete:false,
			}
		},
		mounted() {
			this.formInit();
			this.getImageTime();
			setTimeout(() => {
				this.renderUploadImageViewer();
			}, 100)
		},
		methods: {
			renderUploadImageViewer: function() {
				this.ViewerDom = document.getElementById('viewer_image_show');
				this.viewer = new Viewer(this.ViewerDom, {
					url: 'data-original',
					toolbar: true,
					scalable: false,
					rotatable: false,
					rotatable: false,
					title: false,
				});
			},
			// http://192.168.8.20:60260/shop/upfile.jsp
			formInit: function() {
				var self = this;

				layui.use('form', function() {
					var form = layui.form;
					form.on('select(selected_time)', (data) => {
						self.img_time = data.value;
						self.getImages();
					});
				});

				layui.use('laydate', function() {
					//日期范围
					var laydate = layui.laydate;
					laydate.render({
						elem: '#img_time_select',
						format: "yyyy-MM-dd",
						done: function(value, date) {
							self.img_time = value;
						}
					});
				});


				layui.use('upload', function() {
					var upload = layui.upload;
					upload.render({
						elem: '#' + self.chooseImg_id,
						url: "http://dearsan.top/restful/sansan/upload/",
						auto: false, //选择文件后不自动上传
						bindAction: '#uploadAction',
						accept: "images",
						acceptMime: ".jpg, .JPEG, .png, .PNG",
						exts: "jpg|png|PNG|JPEG",
						multiple: true,
						number: 5,
						choose: function(obj) {
							var files = obj.pushFile(); //将每次选择的文件追加到文件队列
							self.selectComplete = true;
							obj.preview(function(index, file, result) {
								obj.resetFile(index, file, self.img_time+"_"+file.name); //重命名文件名，layui 2.3.0 开始新增
							});
						},
						before: function(obj) { //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
							layui.layer.load(); //上传loading
						},
						done: function(res, index, upload) {
							console.log(res);
							if (res.error == 0) {
								self.getImages();
							} else {
								layui.layer.msg("上传异常");
							}
							layui.layer.closeAll('loading'); //关闭loading
						},
						error: function(index, upload) {
							layui.layer.closeAll('loading'); //关闭loading
							layui.layer.msg("上传失败");
						}
					});
				});
			},
			reloadViewer: function() {
				setTimeout(() => {
					this.viewer.update();
				}, 100)
			},

			getImages: function() {
				var self = this;
				axios.post('http://dearsan.top/restful/sansan/user/getImageList', {
						time: self.img_time
					})
					.then(function(response) {
						console.log(response);
						if (response.data.images && response.data.images.length > 0) {
							self.img_list = response.data.images;
							self.reloadViewer();
						}
					})
					.catch(function(error) {

					});
			},
			getImageTime: function() {
				var self = this;
				axios.post('http://dearsan.top/restful/sansan/user/getContentTimeList')
					.then(function(response) {
						console.log(response);
						if (response.data.time_list) {
							self.time_list = response.data.time_list;
							if (self.time_list.length > 0) {
								self.img_time = self.time_list[0];
								self.getImages();
							}
						}
					})
					.catch(function(error) {

					});
			}
		}
	}
</script>
<style scoped="scoped">
	.content {
		padding: 20px 20px;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
	}

	ul li {
		width: 200px;
		list-style: none;
		padding: 1px;
		margin-right: 15px;
		margin-bottom: 15px;
		cursor: pointer;
	}

	ul li img {
		width: 200px;
		overflow: hidden;
	}
</style>
