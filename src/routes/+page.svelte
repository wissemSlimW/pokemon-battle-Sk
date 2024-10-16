<script lang="ts">
	import AddCard from '$lib/components/AddCard/AddCard.svelte';
	import DeleteDialog from '$lib/components/DeleteDialog/DeleteDialog.svelte';
	import type { Pokemon, PokemonType } from '$lib/types';
	import { getItem } from '$lib/utils';
	import Card from './components/Card/Card.svelte';
	import Dialog from './components/Dialog/dialog.svelte';
	import type { Data } from './types';
	export let data: Data = {
		pokemon: [],
		pokemonTypes: []
	};

	// loacal variable
	let isDeleteDialogOpen = false;
	let isFormDialogOpen = false;
	let deleteItem: Pokemon = null! as Pokemon;
	const defaultData: Pokemon = { name: '', image: '', life: 50, power: 10, type: null! as number };
	let formData: Pokemon = defaultData;
	// actions
	const closeDeleteDialog = () => {
		isDeleteDialogOpen = false;
	};
	const closeFormDialog = () => {
		formData = defaultData;
		isFormDialogOpen = false;
	};
	const handleUpdate = (pokemon: Pokemon) => {
		formData = pokemon;
		isFormDialogOpen = true;
	};
	const handleDelete = (pokemon: Pokemon) => {
		isDeleteDialogOpen = true;
		deleteItem = pokemon;
	};
	const handleClick = () => {
		isFormDialogOpen = true;
	};
	// api request actions
	const confirmDelete = async () => {
		try {
			await fetch(`/api/pokemon/${deleteItem!.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			data.pokemon = data.pokemon.filter((p) => p.id !== deleteItem!.id);
			closeDeleteDialog();
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const manageItem = async (requestData: Pokemon) => {
		let updatedPokemon: Pokemon;
		try {
			if (requestData.id) {
				const response = await fetch(`/api/pokemon/${requestData!.id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(requestData)
				});
				updatedPokemon = (await response.json()) as Pokemon;
				const pokemonIndex = data.pokemon.findIndex((p) => p.id === requestData.id);
				const _pokemon = [...data.pokemon];
				_pokemon[pokemonIndex] = requestData;
				data.pokemon = _pokemon;
			} else {
				const response = await fetch(`/api/pokemon/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(requestData)
				});
				updatedPokemon = (await response.json()) as Pokemon;
				data.pokemon = [...data.pokemon, updatedPokemon];
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getType = (id: Pokemon['id']): PokemonType['name'] => {
		return getItem({ list: data.pokemonTypes, field: 'id', value: id })?.name || '';
	};
</script>

<div class="d-flex gap-3 p-3 justify-content-center flex-wrap">
	<AddCard {handleClick} />
	{#each data.pokemon as item}
		<Card
			pokemon={item}
			type={getType(item.id)}
			handleDelete={() => handleDelete(item)}
			handleUpdate={() => handleUpdate(item)}
		/>
	{/each}
</div>

{#if isDeleteDialogOpen}
	<DeleteDialog text={deleteItem.name} {closeDeleteDialog} {confirmDelete} />
{/if}
{#if isFormDialogOpen}
	<Dialog
		pokemonTypes={data.pokemonTypes}
		onConfirm={manageItem}
		onClose={closeFormDialog}
		pokemon={formData}
	/>
{/if}
