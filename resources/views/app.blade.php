<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
	<meta charset="utf-8">
	<meta content="width=device-width, initial-scale=1" name="viewport">

	<title inertia>{{ config('app.name', 'Laravel') }}</title>

	<!-- Scripts -->
	@viteReactRefresh
	@vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
	@inertiaHead
</head>

<body class="font-sans antialiased">
	@inertia
</body>

</html>
