<template>
	<v-container>
		<v-flex xs12>
			<v-list>
				<v-list-item v-for="(item, index) in items" :key="index.id" style="list-style:none">
					<span :data-id="item.id" @click="loadLogStreams(item.title)">{{item.title}}</span>
				</v-list-item>
				<v-btn @click="loadMoreLogs" v-if="nextToken">Load More</v-btn>
			</v-list>
		</v-flex>
	</v-container>
</template>

<script>
export default {
	name: 'LogHome',
	data(){
		return {
			items: [],
			nextToken: ''
		}
	},
	async mounted(){
		await this.loadMoreLogs()
	},
	methods: {
		async loadMoreLogs(){
			const params = {}
			if(this.nextToken){
				params.nextToken = this.nextToken
			}
			const logs = await this.$store.dispatch("getLogGroups", params);
			this.items = logs.logGroups;
			this.nextToken = logs.nextToken;
			console.log(this.items);
		},
		loadLogStreams(id){
			console.log(id)
			this.$router.push("/log/${id}")
		}
	}
}
</script>

<style>

</style>
