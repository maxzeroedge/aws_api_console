<template>
	<v-container>
		<v-flex xs12>
			<v-list>
				<v-list-item v-for="(item, index) in items" :key="index.id" style="list-style:none">
					<span>{{item}}</span>
				</v-list-item>
				<v-btn @click="loadMoreLogEvents" v-if="nextToken">Load More</v-btn>
			</v-list>
		</v-flex>
	</v-container>
</template>

<script>

export default {
	name: 'LogStream',
	async mounted(){
		await this.loadMoreLogEvents()
	},
	methods: {
		async loadMoreLogEvents(){
			const params = {
				logGroupName: this.$route.params.group,
				logStreamName: this.$route.params.stream
			}
			if(this.nextToken){
				params.nextToken = this.nextToken
			}
			const logs = await this.$store.dispatch("getLogEvents", params);
			this.items = logs.logEvents;
			this.nextToken = logs.nextToken;
			console.log(this.items);
		}
	}
}
</script>
