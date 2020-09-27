<template>
	<v-container>
		<v-flex xs12>
			<v-text-field 
				v-model="searchTerm"
				append-outer-icon="mdi-magnify"
				@click:append-outer="updateSearch"
			></v-text-field>
			<v-list>
				<v-list-item v-for="(item, index) in items" :key="index.id" style="list-style:none">
					<span :data-id="item.id" @click="loadLogStreams(item.title)">{{item.title}}</span>
				</v-list-item>
				<v-btn @click="loadMoreLogs" v-if="nextToken" ref="loadingButton">{{loadMoreText}}</v-btn>
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
			nextToken: '',
			loadMoreText: 'Load More'
		}
	},
	async mounted(){
		await this.loadMoreLogs()
	},
	methods: {
		async loadMoreLogs(attrs){
			this.loadMoreText = "Loading...."
			const params = {}
			if(attrs && attrs.searchTerm){
				params.searchTerm = attrs.searchTerm
			} else if(this.nextToken){
				params.nextToken = this.nextToken
			}
			const logs = await this.$store.dispatch("getLogGroups", params);
			if(logs.logGroups){
				if(attrs && attrs.searchTerm) {
					this.items = logs.logGroups;
				} else {
					logs.logGroups.forEach(v=>{
						this.items.push(v)
					});
				}
			}
			this.nextToken = logs.nextToken;
			this.loadMoreText = "Load More"
		},
		loadLogStreams(name){
			name = btoa(name)
			this.$router.push({path: `/stream/${name}`})
		},
		async updateSearch(){
			if(this.searchTerm && this.searchTerm.length > 3){
				await this.loadMoreLogs({searchTerm: this.searchTerm})
			}
		}
	}
}
</script>

<style>

</style>
