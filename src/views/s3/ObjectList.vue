<template>
	<v-container>
		<v-flex xs12>
			<v-text-field 
				v-model="searchTerm"
				append-outer-icon="mdi-magnify"
				@click:append-outer="updateSearch"
			></v-text-field>
			<v-list>
				<v-list-item v-for="(item, index) in items" :key="index" style="list-style:none">
					<span :data-date="item.date" @click="openObject(item.title)">{{item.title}}</span>
				</v-list-item>
			</v-list>
		</v-flex>
	</v-container>
</template>

<script>
export default {
	name: 'ObjectList',
	data(){
		return {
			searchTerm: '',
			items: [],
			filteredItems: [],
		}
	},
	async mounted(){
		await this.loadObjectNames()
	},
	methods: {
		async loadObjectNames(attrs){
			const params = {}
			if(attrs && attrs.searchTerm){
				params.searchTerm = attrs.searchTerm
			} else if(this.nextToken){
				params.nextToken = this.nextToken
			}
			const logs = await this.$store.dispatch("getS3Objects", params);
			if(logs.objects){
				this.items = log.objects;
				this.filteredItems = log.objects;
			}
		},
		openObject(name){
			name = btoa(name)
			this.$router.push({path: `/stream/${name}`})
		},
		async updateSearch(){
			if(this.searchTerm && this.searchTerm.length > 3){
				const searchTerm = this.searchTerm
				this.filteredItems = this.items.filter(v=>(v.title.indexOf(searchTerm) > -1));
			}
		}
	}
}
</script>

<style>

</style>