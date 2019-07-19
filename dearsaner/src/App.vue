<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
	mounted: function() {
		layui.use(['layer', 'form', 'element','jquery','laydate', 'laypage', 'table'], function() {
			var layer = layui.layer,
				form = layui.form,
				element = layui.element,
				$=layui.$;
		});
	},
}
</script>

<style>

</style>
