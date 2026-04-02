<template>
	<div class="vstack w-100 h-100 overflow-auto">
		<!-- Acquisition Record -->
		<div class="table-container overflow-y-auto">
			<table class="table table-hover clickable text-center">
				<thead class="position-sticky top-0 w-100 table-light">
					<tr>
						<th>Qty</th>
						<th class="text-start">Order ID</th>
						<th>Mode of Acquisition</th>
						<th class="text-start">Dealer</th>
						<th class="text-start" style="width: 30%">Summary</th>
						<th>Date of Acquisition</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="acq in item" :key="acq.id" title="Clik to view details.">
						<td>{{ acq.acquisition_lines.quantity }}</td>
						<td class="text-start">{{ acq.purchaseId || "-" }}</td>
						<td class="text-capitalize">{{ acq.acquisition_mode }}</td>
						<td class="text-start">{{ acq.dealer }}</td>
						<td class="text-start">
							{{
								`${acq.acquisition_lines?.quantity} 
								${acq.acquisition_lines?.quantity > 1 ? "copies" : "copy"} 
								of this item has been 
								${acq.acquisition_mode === "gift" ? acq.acquisition_mode + "ed" : acq.acquisition_mode} 
								${acq.acquisition_mode === "exchange" ? "with" : acq.acquisition_mode === "donated" ? "by" : acq.acquisition_mode === "purchased" ? "from" : acq.acquisition_mode === "gift" ? "by" : ""} 
								${acq.acquisition_mode === "purchased" ? acq.dealer + " worth ₱" + acq.acquisition_lines.net_price + "." : acq.dealer + "."}`
							}}
						</td>
						<td>{{ formatShortDate(acq.acquisition_date) }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import { formatShortDate } from "@/utilities/dataManipulation";

export default {
	props: {
		item: Object,
	},

	setup() {
		return {
			formatShortDate,
		};
	},
};
</script>
