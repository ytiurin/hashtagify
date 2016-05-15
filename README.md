# hashtagify
Add hashtags to a title based on a description analysis.

```javascript
var title = "My title with the repeating phrase and an important word.";
var description = "Description containing the same repeating phrase couple of times (repeating phrase)."
var dictionary = ['important'];

var myTitle = hashtagify(title,description,dictionary);
// My title with the #RepeatingPhrase and an #Important word.
```

### Configure
```javascript
//Enable debug output to console
hashtagify.debug=true;

//Disable "word 7" => "#Word7"
hashtagify.doFollowedByNumber=false;

//Disable "dash-or.dot" => "#DashOrDot"
hashtagify.doDottedAndDashed=false;

```
