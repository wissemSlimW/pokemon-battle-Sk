<script lang="ts">
	import { onMount } from 'svelte';

	export let text: string = '';
	export let closeDeleteDialog: () => void = null! as () => void;
	export let confirmDelete: () => void = null! as () => void;
	let deleteDialog: HTMLDialogElement | null = null;
	const OnDelete = () => {
		confirmDelete();
		deleteDialog?.close();
	};

	const closeModal = () => {
		deleteDialog?.close();
		if (closeDeleteDialog) {
			closeDeleteDialog!();
		}
	};

	onMount(() => {
		if (deleteDialog) {
			deleteDialog.showModal();
		}
	});
</script>

<dialog bind:this={deleteDialog} class="rounded-4 border-light p-4">
	<h1 class="modal-title fs-5">Delete Operation</h1>
	<div class="modal-body py-4">
		<span>
			Would you like to delete this item
			<span class="fw-bold text-primary">{text}</span>
		</span>
	</div>
	<div class="modal-footer d-flex gap-3">
		<button type="button" class="btn btn-light" on:click={closeModal}> Close </button>
		<button type="button" class="btn btn-primary" on:click={OnDelete}> Save changes </button>
	</div>
</dialog>
