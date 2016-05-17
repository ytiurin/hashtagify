# hashtagify
Add hashtags to a title, relying on a description analysis. This script picks a number of phrases from the given title string and search them in the description string. If a number of phrase entrances in the description is more then 1, a phrase is considered to be a hashtag. Also a user vocabulary can be used to hashtag specific words.

```javascript
var title = "My title with the repeating phrase and an important word.";
var description = "Description containing the same repeating phrase couple of times (repeating phrase)."
var vocabulary = ['important'];

var newTitle = hashtagify(title,description,vocabulary);
// My title with the #RepeatingPhrase and an #Important word.
```

### Install
```
npm install hashtagify
```
or
```
bower install hashtagify
```

### Configure
You can enable a debug mode to check a console hashtagifying process.

```javascript
//Enable debug output to console
hashtagify.debug=true;
```

There is also a couple of postprocess enhancements enabled by default. You can turn them off.

A word followed by a number character is merged together and considered a hashtag. Example: `"word 7" => "#Word7"`. Enabled by default.
```javascript
//Disable "word 7" => "#Word7"
hashtagify.doFollowedByNumber=false;
```

A word with a dash or a dot inside it, is CamelCased and considered a hashtag. Example: `"dash-or.dot" => "#DashOrDot"`. Enabled by default.
```javascript
//Disable "dash-or.dot" => "#DashOrDot"
hashtagify.doDottedAndDashed=false;

```
