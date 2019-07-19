<template>
	<div class="layui-form content">
		<div class="spaceLeft">
			<input class="layui-input" v-model="text" style="width: 200px;margin-right: 20px;"/>
			<button class="layui-btn" v-on:click="getXFAudio">播放语音</button>
		</div>
		<div style="margin-top: 20px;">
			<audio id="audioPlay" controls="controls">
				<source :src="url_audio" type="audio/mpeg" />
				别试了，是你的浏览器不支持！
			</audio>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		name: 'xfAudio',
		data: function() {
			return {
				msg: "",
				text: "",
				url_audio: "",
			}
		},
		methods: {
			getXFAudio: function() {
				if (this.text != null && this.text.length == 0) {
					layui.layer.msg("请填写要语音播放的文字");
					return;
				}
				var self = this;
				axios.post('http://dearsan.top/restful/sansan/common/getXFAudio', {
						text: self.text
					})
					.then(function(response) {
						console.log(response);
						if (response.data.error == 0) {
							self.url_audio = "http://dearsan.top/xfAudio/" + response.data.audioURL;
							self.playAudio();
						}
					})
					.catch(function(error) {

					});
			},
			playAudio:function(){
				let m = document.getElementById('audioPlay');
				m.load();
				m.play();
			}
		}
	}
</script>

<style scoped="scoped">
	.content {
		padding: 20px 20px;
	}
</style>
