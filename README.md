# VueJs FakeOS

Funny webapp side project for simulating a desktop OS in a web browser.
<br />
See it in use for [my web developper portfolio](benjaminlouislhomme.netlify.app).
<br /><br />
Fork it, contribute, have fun.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Run it with your own datas

Set your own datas url in .env file :
```
VITE_DATAS_ENDPOINT=<YOUR_URL>
```

Datas tree must be in JSON format, like this :

```json
{
	"title": "Your title",
	"subtitle": "Your subtitle",
	"elements": [
		{
			"title": "Foo",
			"type": "file",
			"content": "Foo file content ..."
		},
		{
			"title": "Bar",
			"type": "dir",
			"elements": [
				{
					"title": "Fizz",
					"type": "file",
					"content": ["Apple", "Banana", "Kiwi", "Orange"]
				},
				{
					"title": "Fizz",
					"type": "file",
					"content": "Lorem ipsum ..."
				}
			]
		}
	]
}
```

You can store your customs icons in **public/icons/** directory and set it in your datas :

```json
// some element in your datas tree
{
	"title": "Your element title",
	"type": "file",
	"icon": "your_icon_title.png"
}
```
You can store your customs images in **public/images/** directory 