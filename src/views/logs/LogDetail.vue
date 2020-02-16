<template>
	<v-container>
		<v-flex xs12>
			<v-simple-table>
				<template v-slot:default>
					<thead>
						<tr>
						<th class="text-left">Time</th>
						<th class="text-left">Message</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in items" :key="index.id" style="list-style:none">
							<td class="text-left">{{moment.utc(item.timestamp).format("YYYY-MM-DD HH:mm")}}</td>
							<td class="text-left">{{item.message}}</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
			<v-btn @click="loadMoreLogEvents" v-if="nextToken">Load More</v-btn>
		</v-flex>
	</v-container>
</template>

<script>
import moment from 'moment';

export default {
	name: 'LogStream',
	data(){
		return {
			moment,
			group: '',
			stream: '',
			items: [],
			nextToken: ''
		}
	},
	async mounted(){
		await this.loadMoreLogEvents()
	},
	methods: {
		async loadMoreLogEvents(){
			this.group = this.$route.params.group;
			this.stream = this.$route.params.stream;
			const params = {
				logGroupName: atob(this.$route.params.group),
				logStreamName: atob(this.$route.params.stream)
			}
			if(this.nextToken){
				params.nextToken = this.nextToken
			}
			const logs = await this.$store.dispatch("getLogEvents", params);
			if(logs.logEvents){
				logs.logEvents.forEach(v=>{
					this.items.push(v)
				});
			}
			this.nextToken = logs.nextToken;
		}
	}
}
</script>
