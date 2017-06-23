# Intro to Selenium
**Selenium** is a library that allows us to interact programmatically with the
browser. It's like being able to write programs for a remote control. We'll be
able to write code that loads webpages, finds HTML elements, enters text, clicks
on things and verify the state of elements on the page. **Selenium** is very
useful for writing UI tests, like making sure a login form displays error
messages properly when users enter incorrect information.

## Objectives
* Install Selenium
* Control browser remotely with JavaScript using Selenium
  * Load webpages
  * Find HTML elements on the page
  * Click on HTML elements
  * Insert text to HTML input elements
  * Verify text content of HTML elements

# Installing Selenium
**Selenium** is a library that allows us to interact with many different web
browsers. **Selenium** relies on custom drivers being installed for different
web browsers. In order to get **Selenium** working with Chrome, we'll need to
first install `chromedriver` (globally so we never have to install it again)
and then install the **Selenium** library itself.

Install `chromedriver` with npm and save it as a global module.

```
npm install -g chromedriver
```

Make a new directory called `selenium-intro` and change into it.
Install the **Selenium** as dev dependencies in the directory. The `--save-dev`
flag means that this module dependency will only be installed when you're
developing on your local machine. This saves us from installing it on a
production server if we ever use it in a project that we upload elsewhere.

```
mkdir selenium-intro
cd selenium-intro
npm install --save-dev selenium-webdriver
```

Now we're installed and ready to go! Let's write some code that uses **Selenium**.

# Using Selenium
**Selenium** requires importing a few things and a bit of configuration before
it's up and ready to go. Each time you use **Selenium** make sure to require
the `selenium-webdriver`, grab the `By` and `until` shortcut methods off the
module, and build a `driver` variable specifically configured for Chrome.

Once you've got it imported and configured you can use the `driver` to load
web pages, find HTML elements, enter text and click on things in the page.

This small example loads `http://wikipedia.org`, locates the search box on the
home page, enters "javascript", submits the search form and allows the browser
to be taken to the JavaScript article.

Copy this code to a file called `search-wikipedia.js` on your own computer and
run it with `node search-wikipedia.js`. You should see a Chrome window pop up,
load Wikipedia, enter some text and go to the JavaScript wikipedia page. It's
like watching a ghost in your machine!

**search-wikipedia.js**
```js
!INCLUDE code/search-wikipedia.js
```

# Basic Selenium Commands

# Targeting HTML Elements
In order for **Selenium** to interact with websites it needs to know what HTML
elements we're interacting with. **Selenium** finds elements in the DOM very
much like we do in Vanilla JavaScript or jQuery: we use the DOM. **Selenium**
provides us with the `By` property which defines how we look elements up.

We're able to get access to HTML elements by many ways. Refer to the
[Static Functions](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_By.html)
attached to the `By` class to see what's all available.

Here's some of the most popular ways elements can be looked up by. Each of these
can be passed into the `driver.findElement(by)` function.

* `By.id( id )` - the most common.
* `By.className( name )` - Not very common. Remember that classes appear many times,
  so looking for something by a class name is ambiguous. It likely returns
  multiple results.
* `By.css( selector )` - use a complex CSS selector like `#left-nav .section button`
* `By.tagName( name )` - the name of the HTML tag, like `'p'` or `'button'`
* `By.name( name )` - find an element with a name attribute like `<input name="email" />`
* `By.linkText( text )` - find a link that has text matching *exactly*.
* `By.partialLinkText( text )` - find a link with text that's a partial match.

## Know Thy Website
If you want to use **Selenium** to interact with a website effectively then
you'll need to know the underlying structure of the website. It's easy for us
as humans to tell something, "click on the login button." **Selenium** lacks
our human understanding. **Selenium** requires us to be ultra-specific and
use the DOM when we tell it to find something on the page.

Before you use **Selenium** to interact with a webpage you'll need to perform
some initial manual reconnaissance. Load the webpage and use your developer
tools to find out the `id` of an element you want to interact with. See if
form inputs have `name` attributes you can search for. If there's a link you
want to click you can take note of the link text and use the `By.linkText()`
and `By.partialLinkText()` methods to obtain a reference to it.

The Wikipedia code we used earlier relied on prior knowledge. Someone else did
the initial manual reconnaissance. The wikipedia **Selenium** code relied on
knowing the id of the search box and the id of the search form. If you're lucky,
then every thing on a website that you want to interact with will have a clean,
sensible, easy-to-find id.

The Chrome Developer Tools are extremely helpful when you're trying to find out
if something on the page has a useful easy-to-find id. Simply right click on
what you want to interact with and choose `Inspect`. Look at the HTML in the
`Elements` panel and see if thing has an id on it!

![Right click on an element and choose "Inspect"](assets/inspect-element.png)

![The element has an id!](assets/inspect-element-id.png)

If something doesn't have an id or another easy thing `By` is designed to search
for then you'll end up having to write code that manually sifts through
possibilities to find what you're looking for.

If you're designing a website that you want to use **Selenium** with later, then
do yourself a favor and add handy ids, names and other identifiers to what you
want to interact with!

# Exercise: Log into Facebook with Selenium
Make a new file called `facebook-login.js` and write your own **Selenium**
code that logs into your Facebook account. You'll need to find a reference
to three things:

* The HTML element where you input your username
* The HTML element where you input your password
* The HTML element that you click to log in

Use what you know about using `Right Click -> Inspect` and the Chrome Developer
Tools to find IDs.

If you feel weird about typing your Facebook password into a file and saving it
then use this boilerplate code. Run `npm install --save prompt`. The `prompt`
module allows you to prompt users to type in their username and password on
the console.

```js
!INCLUDE code/facebook-login-boilerplate.js
```
