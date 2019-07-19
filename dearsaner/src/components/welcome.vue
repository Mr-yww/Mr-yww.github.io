<template>
	<div class="main-page spaceCenter">
		<div class="contentPage">
			<label class="menuTitle">MENU</label>
			<div class="insideContent spaceBetween">
				<div class="spaceLeft introduction">
					<div class="spaceLeft" style="width: calc(100% - 100px);margin: 50px 50px;">
						<label style="font-family: 'arial rounded mt bold';width: 100%;font-size: 48px;margin-bottom: 30px;">Learn and live</label>
						<label style="width: 100%;font-size: 16px;line-height: 25px;margin-bottom: 30px;">Take a piano. The keys begin, the keys end. You know there are eightyeight of them,
							nobody can tell you any different.
							They are not infinite. You are infinite. And on these keys the music that you can make is infinite. I like that.
							That I can
							live by.</label>
						<label style="width: 100%;font-size: 38px;margin-bottom: 10px;">以有限人生，谱无限乐章</label>
						<label style="width: 100%;font-size: 20px;">每一天都是新的一天，这就是你应当微笑的理由</label>
					</div>

				</div>
				<div class="spaceCenter" style="width: 38%;height: 100%;">
					<div class="spaceCenter">
						<div class="menuOption spaceCenter">
							<button class="btn_none" v-on:click="gotoMyPage">个人主页</button>
							<a id="gotoMyPageLink" v-show="false" href="http://dearsan.top/dearsan" target="_blank"></a>
						</div>
						<div class="menuOption spaceCenter">
							<button class="btn_none">技术分享</button>
						</div>
						<div class="menuOption spaceCenter">
							<button class="btn_none">日有所思</button>
						</div>
						<div class="menuOption spaceCenter">
							<button class="btn_none" v-on:click="gotoAbout">关于</button>
						</div>
					</div>

				</div>
			</div>
		</div>
		<div style="position: absolute;bottom: 15px;">
			<label style="width: 100%;text-align: center;color: #CD6600;">Copyright © 2018 杨新财. All rights reserved.</label>
		</div>

	</div>

</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			gotoMyPage:function(){
				var $ = this.$;
				setTimeout(() => {
					$("#gotoMyPageLink")[0].click();
				}, 1)
			},
			gotoAbout:function(){
				this.$router.push('upload');
// 				this.$router.push({
// 					name: 'upload'
// 				});
			}
		}
	}
</script>

<style scoped>
	.main-page {
		background-color: bisque;
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	.contentPage {
		background-image: url(../images/background.png);
		background-repeat: no-repeat;
		background-size: 100%;
		width: 95%;
		height: 85%;
		min-width: 1000px;
		min-height: 540px;
		position: relative;
	}

	.insideContent {
		background-color: #EE7AE988;
		width: calc(100% - 90px);
		;
		height: calc(100% - 90px);
		;
		margin: 90px 0px 0px 90px;
	}

	.introduction {
		width: 60%;
	}
	
	.introduction label{
		color: #FFF;
		font-family: 'arial rounded mt bold';
	}

	.menuTitle {
		position: absolute;
		top: 8%;
		right: 27%;
		font-size: 20px;
		color: #FFF;
		font-weight: bolder;
	}
	
	.menuOption {
		width: 100%;
		margin-bottom: 40px;
	}

	.menuOption button {
		font-size: 16px;
	}

	button:active {
		font-size: 18px;
		font-weight: bold;
	}

	button:hover {
		top: 2px;
		font-size: 18px;
		font-weight: bolder;
		position: relative;
	}
</style>
