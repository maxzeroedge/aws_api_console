<template>
	<v-app>
		<v-container>
			<v-flex xs4>
				<v-btn @click="goHome">Home</v-btn>
				<v-btn @click="goBack">Back</v-btn>
			</v-flex>
		</v-container>
		<router-view />
	</v-app>
</template>

<script>

export default {
	name: 'App',
	methods: {
		goHome(){
			this.$router.push({path: "/"});
		},
		goBack(){
			this.$router.go(-1);
		}
	}
}
</script>

<style lang="stylus">
#app
	font-family Avenir, Helvetica, Arial, sans-serif
	-webkit-font-smoothing antialiased
	-moz-osx-font-smoothing grayscale
	text-align center
	color #2c3e50
	margin-top 60px
</style>
