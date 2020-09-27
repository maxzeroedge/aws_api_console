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
					<span @click="loadLogEvents(item.title)">{{item.id.split(":")[8]}}</span>
				</v-list-item>
				<v-btn @click="loadMoreLogStreams" v-if="nextToken">Load More</v-btn>
			</v-list>
		</v-flex>
	</v-container>
</template>

<script>

export default {
	name: 'LogStream',
	data(){
		return {
			group: '',
			items: [],
			nextToken: '',
			searchTerm: ''
		}
	},
	async mounted(){
		await this.loadMoreLogStreams()
	},
	methods: {
		async loadMoreLogStreams(attrs){
			this.group = this.$route.params.group;
			const params = {
				logGroupName: atob(this.group)
			}
			if(attrs && attrs.searchTerm){
				params.searchTerm = attrs.searchTerm
			} else if(this.nextToken){
				params.nextToken = this.nextToken
			}
			const logs = await this.$store.dispatch("getLogStreams", params);
			if(logs.logStreams){
				if(attrs && attrs.searchTerm) {
					this.items = logs.logStreams;
				} else {
					logs.logStreams.forEach(v=>{
						this.items.push(v)
					});
				}
			}
			this.nextToken = logs.nextToken;
		},
		loadLogEvents(name){
			name = btoa(name)
			this.$router.push({path: `/log/${this.group}/${name}`})
		},
		async updateSearch(){
			if(this.searchTerm && this.searchTerm.length > 3){
				await this.loadMoreLogs({searchTerm: this.searchTerm})
			}
		}
	}
}
</script>
