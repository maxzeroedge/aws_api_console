<template>
	<v-container>
		<v-flex xs12>
			<v-text-field v-model="searchTerm"></v-text-field>
			<v-btn @click="updateSearch">Search</v-btn>
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
			searchTerm: '',
			items: [],
			nextToken: ''
		}
	},
	async mounted(){
		await this.loadMoreLogs()
	},
	methods: {
		async loadMoreLogs(attrs){
			const params = {}
			if(attrs){
				params.searchTerm = attrs.searchTerm
			} else if(this.nextToken){
				params.nextToken = this.nextToken
			}
			const logs = await this.$store.dispatch("getLogGroups", params);
			if(logs.logGroups){
				logs.logGroups.forEach(v=>{
					this.items.push(v)
				});
			}
			this.nextToken = logs.nextToken;
		},
		loadLogStreams(name){
			name = btoa(name)
			this.$router.push({path: `/stream/${name}`})
		},
		async updateSearch(){
			await this.loadMoreLogs({searchTerm: this.searchTerm})
		}
	}
}
</script>

<style>

</style>
