export const SUPPORTED_LANGUAGES = [
	{
		code: 'en',
		name: 'English',
		nativeName: 'English',
		flag: (width, height) => (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" style={{
				width: width,
				height: height
			}}>
				<path fill="#FFF" d="M0 0h513v342H0z"></path>
				<path
					fill="#D80027"
					d="M0 0h513v26.3H0zm0 52.6h513v26.3H0zm0 52.6h513v26.3H0zm0 52.6h513v26.3H0zm0 52.7h513v26.3H0zm0 52.6h513v26.3H0zm0 52.6h513V342H0z"
				></path>
				<path fill="#2E52B2" d="M0 0h256.5v184.1H0z"></path>
				<path
					fill="#FFF"
					d="m47.8 138.9-4-12.8-4.4 12.8H26.2l10.7 7.7-4 12.8 10.9-7.9 10.6 7.9-4.1-12.8 10.9-7.7zm56.3 0-4.1-12.8-4.2 12.8H82.6l10.7 7.7-4 12.8 10.7-7.9 10.8 7.9-4-12.8 10.7-7.7zm56.5 0-4.3-12.8-4 12.8h-13.5l11 7.7-4.2 12.8 10.7-7.9 11 7.9-4.2-12.8 10.7-7.7zm56.2 0-4-12.8-4.2 12.8h-13.3l10.8 7.7-4 12.8 10.7-7.9 10.8 7.9-4.3-12.8 11-7.7zM100 75.3l-4.2 12.8H82.6L93.3 96l-4 12.6 10.7-7.8 10.8 7.8-4-12.6 10.7-7.9h-13.4zm-56.2 0-4.4 12.8H26.2L36.9 96l-4 12.6 10.9-7.8 10.6 7.8L50.3 96l10.9-7.9H47.8zm112.5 0-4 12.8h-13.5l11 7.9-4.2 12.6 10.7-7.8 11 7.8-4.2-12.6 10.7-7.9h-13.2zm56.5 0-4.2 12.8h-13.3l10.8 7.9-4 12.6 10.7-7.8 10.8 7.8-4.3-12.6 11-7.9h-13.5zm-169-50.6-4.4 12.6H26.2l10.7 7.9-4 12.7L43.8 50l10.6 7.9-4.1-12.7 10.9-7.9H47.8zm56.2 0-4.2 12.6H82.6l10.7 7.9-4 12.7L100 50l10.8 7.9-4-12.7 10.7-7.9h-13.4zm56.3 0-4 12.6h-13.5l11 7.9-4.2 12.7 10.7-7.9 11 7.9-4.2-12.7 10.7-7.9h-13.2zm56.5 0-4.2 12.6h-13.3l10.8 7.9-4 12.7 10.7-7.9 10.8 7.9-4.3-12.7 11-7.9h-13.5z"
				></path>
			</svg>
		),
		dir: 'ltr',
		dateFormat: 'MM/dd/yyyy',
		numberFormat: {
			decimal: '.',
			thousands: ',',
			currency: '$'
		},
		pluralRules: (count) => count === 1 ? 'one' : 'other'
	},
	{
		code: 'ur',
		name: 'Urdu',
		nativeName: 'اردو',
		flag: (width, height) => (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" style={{
				width: width,
				height: height
			}}>
				<g fill="#FFF">
					<path d="m393.508 170.516 17.512 18.875 23.363-10.821-12.541 22.487 17.513 18.876-25.263-4.978-12.539 22.488-3.073-25.564-25.263-4.978 23.363-10.82z"></path>
					<path d="M0 85.343h512v341.326H0z"></path>
				</g>
				<path fill="#01411c" d="M128 85.331h384v341.337H128z"></path>
				<path
					fill="#FFF"
					d="M361.909 298.793c-31.037 22.426-74.378 15.446-96.804-15.592s-15.446-74.379 15.593-96.804c9.677-6.992 20.55-11.125 31.613-12.563-21.283-3.183-43.777 1.613-62.598 15.211-38.2 27.602-46.792 80.944-19.191 119.145 27.601 38.199 80.944 46.792 119.145 19.189 18.82-13.598 30.436-33.448 34.096-54.655-4.839 10.05-12.176 19.076-21.854 26.069m-1.329-125.904 17.484 18.842 23.322-10.802-12.519 22.447 17.483 18.844-25.219-4.968-12.519 22.45-3.067-25.521-25.22-4.969 23.323-10.802z"
				></path>
			</svg>
		),
		dir: 'rtl',
		dateFormat: 'dd/MM/yyyy',
		numberFormat: {
			decimal: '.',
			thousands: ',',
			currency: 'ر.س'
		},
		pluralRules: (count) => {
			if (count === 0) return 'zero';
			if (count === 1) return 'one';
			if (count === 2) return 'two';
			if (count >= 3 && count <= 10) return 'few';
			if (count >= 11 && count <= 99) return 'many';
			return 'other';
		}
	},
	{
		code: 'ar',
		name: 'Arabic',
		nativeName: 'العربية',
		flag: (width, height) => (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 85.333 512 341.333" style={{
				width: width,
				height: height
			}}>
				<path fill="#055e1c" d="M0 85.333h512v341.333H0z"></path>
				<g fill="#FFF">
					<path d="M183.548 289.386c0 12.295 9.731 22.261 21.736 22.261h65.208c0 10.244 8.11 18.551 18.114 18.551h21.736c10.004 0 18.114-8.306 18.114-18.551v-22.261zm146.716-107.595v51.942c0 8.183-6.5 14.84-14.491 14.84v22.261c19.976 0 36.226-16.643 36.226-37.101v-51.942zm-155.773 51.943c0 8.183-6.5 14.84-14.491 14.84v22.261c19.976 0 36.226-16.643 36.226-37.101v-51.942H174.49v51.942z"></path>
					<path d="M297.661 181.788h21.736v51.942h-21.736zm-32.604 29.685c0 2.046-1.625 3.71-3.623 3.71s-3.623-1.664-3.623-3.71v-29.682h-21.736v29.682c0 2.046-1.625 3.71-3.623 3.71s-3.623-1.664-3.623-3.71v-29.682h-21.736v29.682c0 14.32 11.376 25.971 25.358 25.971 5.385 0 10.38-1.733 14.491-4.677 4.11 2.944 9.106 4.677 14.491 4.677 1.084 0 2.15-.078 3.2-.215-1.54 6.499-7.255 11.345-14.068 11.345v22.261c19.976 0 36.226-16.643 36.226-37.101v-51.943h-21.736z"></path>
					<path d="M207.093 248.57h32.601v22.261h-32.601z"></path>
				</g>
			</svg>
		),
		dir: 'rtl',
		dateFormat: 'dd/MM/yyyy',
		numberFormat: {
			decimal: '.',
			thousands: ',',
			currency: 'ر.س'
		},
		pluralRules: (count) => {
			if (count === 0) return 'zero';
			if (count === 1) return 'one';
			if (count === 2) return 'two';
			if (count >= 3 && count <= 10) return 'few';
			if (count >= 11 && count <= 99) return 'many';
			return 'other';
		}
	},
	{
		code: 'es',
		name: 'Spanish',
		nativeName: 'Español',
		flag: (width, height) => (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.5 15" style={{
				height: height,
				width: width
			}}>
				<path fill="#FFF" d="M0 0h22.5v15H0z"></path>
				<path fill="#D03433" d="M0 0h22.5v4H0zm0 11h22.5v4H0z"></path>
				<path fill="#FBCA46" d="M0 4h22.5v7H0z"></path>
				<path fill="#FFF" d="M7.8 7h1v.5h-1z"></path>
				<path
					fill="#A41517"
					d="M7.2 8.5c0 .3.3.5.6.5s.6-.2.6-.5L8.5 7H7.1zM6.6 7c0-.3.2-.5.4-.5h1.5c.3 0 .5.2.5.4V7l-.1 1.5c-.1.6-.5 1-1.1 1s-1-.4-1.1-1z"
				></path>
				<path
					fill="#A41517"
					d="M6.8 7.5h2V8h-.5l-.5 1-.5-1h-.5zM5.3 6h1v3.5h-1zm4 0h1v3.5h-1zm-2.5-.5c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v.2q0 .3-.3.3H7c-.1 0-.2-.1-.2-.2z"
				></path>
			</svg>
		),
		dir: 'ltr',
		dateFormat: 'dd/MM/yyyy',
		numberFormat: {
			decimal: ',',
			thousands: '.',
			currency: '€'
		},
		pluralRules: (count) => count === 1 ? 'one' : 'other'
	},
	{
		code: 'fr',
		name: 'French',
		nativeName: 'Français',
		flag: (width, height) => (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" style={{
				width: width,
				height: height
			}}>
				<path fill="#FFF" d="M0 0h513v342H0z"></path>
				<path fill="#00318A" d="M0 0h171v342H0z"></path>
				<path fill="#D80027" d="M342 0h171v342H342z"></path>
			</svg>
		),
		dir: 'ltr',
		dateFormat: 'dd/MM/yyyy',
		numberFormat: {
			decimal: ',',
			thousands: ' ',
			currency: '€'
		},
		pluralRules: (count) => count <= 1 ? 'one' : 'other'
	},
	{
		code: 'zh',
		name: 'Chinese',
		nativeName: '中文',
		flag: (width, height) => (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" style={{
				height: height,
				width: width
			}}>
				<path fill="#D80027" d="M0 0h513v342H0z"></path>
				<path
					fill="#FFDA44"
					d="m226.8 239.2-9.7-15.6-17.9 4.4 11.9-14.1-9.7-15.6 17.1 6.9 11.8-14.1-1.3 18.4 17.1 6.9-17.9 4.4zM290.6 82l-10.1 15.4 11.6 14.3-17.7-4.8-10.1 15.5-1-18.4-17.7-4.8 17.2-6.6-1-18.4 11.6 14.3zm-54.4-56.6-2 18.3 16.8 7.6-18 3.8-2 18.3-9.2-16-17.9 3.8 12.3-13.7-9.2-15.9 16.8 7.5zm56.6 136.4-14.9 10.9 5.8 17.5-14.9-10.8-14.9 11 5.6-17.6-14.9-10.7 18.4-.1 5.6-17.6 5.8 17.5zM115 46.3l17.3 53.5h56.2l-45.4 32.9 17.3 53.5-45.4-33-45.5 33 17.4-53.5-45.5-32.9h56.3z"
				></path>
			</svg>
		),
		dir: 'ltr',
		dateFormat: 'yyyy/MM/dd',
		numberFormat: {
			decimal: '.',
			thousands: ',',
			currency: '¥'
		},
		pluralRules: () => 'other'
	},
	{
		code: 'ja',
		name: 'Japanese',
		nativeName: '日本語',
		flag: (width, height) => (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342" style={{
				width: width,
				height: height
			}}>
				<path fill="#FFF" d="M0 0h512v342H0z"></path>
				<circle cx="256.5" cy="171" r="96" fill="#D80027"></circle>
			</svg>
		),
		dir: 'ltr',
		dateFormat: 'yyyy/MM/dd',
		numberFormat: {
			decimal: '.',
			thousands: ',',
			currency: '¥'
		},
		pluralRules: () => 'other'
	}
];

export const NAMESPACES = ['translation', 'common', 'navigation', 'forms', 'errors', 'dashboard']
export const DEFAULT_LANGUAGE = 'en';
export const FALLBACK_LANGUAGE = 'en';