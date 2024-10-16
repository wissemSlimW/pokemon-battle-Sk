<div class="bg-light max-vw-100 d-flex flex-column min-vh-100 overflow-hidden">
	<div class="bg-primary d-flex justify-content-center gap-3 navbar">
		<a
			href="/"
			class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-3"
			>Home</a
		>
		<a
			href="/teams"
			class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-3"
			>Teams</a
		>
		<a
			href="/battle-portal"
			class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fs-3"
			>Battle Arena</a
		>
	</div>

	<main class="overflow-hidden">
		<slot />
	</main>
</div>
