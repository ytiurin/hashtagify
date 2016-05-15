(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Define global constructor
    root.hashtagify = factory();
  }

}(this,function(){
  'use strict';

  var MAX_SEARCH_PHRASE_WORDS=4;
  var MIN_SEARCH_PHRASE_WORDS=2;
  var MIN_SEARCH_PHRASE_MATCHES=2;

  var excludeDic=[
    'a',
    'all',
    'an',
    'and',
    'are',
    'as',
    'at',
    'be',
    'but',
    'by',
    'do',
    'due',
    'for',
    'from',
    'has',
    'i',
    'in',
    'into',
    'is',
    'it',
    'not',
    'of',
    'on',
    'or',
    'the',
    'than',
    'then',
    'to',
    'with',
    'you',
    'your'
  ];

  function log()
  {
    if(hashtagify.debug)
      console.log.apply(console,arguments);
  }

  function matchCount(text,search)
  {
    for(var pos=-1,n=0;(pos=text.indexOf(search,pos+1))>-1;)
      n++;

    return n;
  }

  var hashtagify=function(hashtagifyText,analyzeText,hashtagDictionary){

    if(hashtagifyText&&analyzeText){
      var inputWords=hashtagifyText.split(/[\s:,!?\/"'\(\)–&“”]+/);

      var i,j,k;

      for(i=inputWords.length;i--;)
        if(inputWords[i].length<=1)
          inputWords.splice(i,1);

      // log('inputWords',inputWords);

      var searches=[],searchWords;

      for(i=0;i<inputWords.length;i++)
        for(j=MAX_SEARCH_PHRASE_WORDS;j>=MIN_SEARCH_PHRASE_WORDS;j--)
          if(i+j<=inputWords.length){
            searchWords=inputWords.slice(i,i+j);

            // search phrase should not start with Number
            if(!isNaN(parseInt(searchWords[0])))
              continue;

            // search phrase should not contain Excluded word
            if(searchWords.some(function(w){return excludeDic.indexOf(w.toLowerCase())>-1}))
              continue;

            // search phrase should not start with Excluded word
            // if(excludeDic.indexOf(searchWords[0].toLowerCase())>-1)
            //   continue;

            // search phrase should not start with .
            if(searchWords[0].charAt(0)==='.')
              continue;

            // remove phrase with hashtag
            if(searchWords.join(' ').indexOf('#')>-1)
              continue;

            searches.push(searchWords.join(' '));
          }

      // log('searches',searches);

      var matches=[];

      for(i=0;i<searches.length;i++)
        matches.push(matchCount(analyzeText.toLowerCase(),searches[i].toLowerCase()));

      // log('matches',matches);
      for(i=0;i<searches.length;i++)
        log('['+matches[i]+']',searches[i])

      var prioritized=searches.slice().filter(function(a){
        return matches[searches.indexOf(a)]>=MIN_SEARCH_PHRASE_MATCHES;

      }).sort(function(a,b){
        var aSpaces=matchCount(a,' ');
        var bSpaces=matchCount(b,' ');

        var aWeight=matches[searches.indexOf(a)];
        var bWeight=matches[searches.indexOf(b)];

        if(aSpaces<bSpaces&&aWeight&&bWeight)
          return -1;

        if(aSpaces>bSpaces&&aWeight&&bWeight)
          return 1;

        return aWeight<bWeight?-1:(aWeight>bWeight?1:0);
      });

      log('prioritized',prioritized);

      var reps=[];
      var lowText=hashtagifyText.toLowerCase();
      var replacement;

      for(i=prioritized.length;i--;)
        if((k=lowText.indexOf(prioritized[i].toLowerCase()))>-1){

          //CamelCase replacement and remove special chars
          replacement=prioritized[i].split(/[\s\.:;\-,!?\/"'“”]+/).map(function(s){return s.charAt(0).toUpperCase() + s.slice(1)}).join('');

          reps.push(replacement);
          lowText=lowText.substring(0,k)+'^'+(reps.length-1)+lowText.substring(k+prioritized[i].length);
          hashtagifyText=hashtagifyText.substring(0,k)+'^'+(reps.length-1)+hashtagifyText.substring(k+prioritized[i].length);

          // replace not more then 3 phrases
          // if(reps.length>=3)
            // break;
        }

      log(hashtagifyText,reps);
    }

    // CamelCase words containing (.) or (-)
    if(hashtagify.doDottedAndDashed){
      var dotMatches=hashtagifyText.match(/\S*[A-Za-z]+[.\-;]+[A-Za-z]+([\s$:,)!?/’]|$)/g);
      dotMatches&&dotMatches.forEach(function(dotMatch){
        hashtagifyText=hashtagifyText.replace(
          dotMatch,
          dotMatch.split(/[.\-;]/).map(function(w){
            return w.charAt(0).toUpperCase()+w.substr(1)}
          ).join(''));
      });
    }

    // merge words with capital letters and following numbers
    if(hashtagify.doFollowedByNumber){
      var numberMatches=hashtagifyText.match(/[a-z]*[A-Z][A-Za-z]+\s\d+([\s:,)!?/’]|$)/g);
      numberMatches&&numberMatches.forEach(function(numberMatch){
        hashtagifyText=hashtagifyText.replace(numberMatch,numberMatch.replace(/\s/,''));
      });
    }

    // hashtagify CamelCase words and num6er words
    var finalMatches=hashtagifyText.match(/(\w+[A-Z]+\w*([\s:,)!?/’]|$))|([A-Z]\w*\d+[A-Za-z]*([\s:,)!?/’]|$))/g);
    finalMatches&&finalMatches.forEach(function(finalMatch){
      hashtagifyText=hashtagifyText.replace(new RegExp(finalMatch.replace(/\W/g,function(m){return '\\'+m}),'g'),'#'+finalMatch.charAt(0).toUpperCase()+finalMatch.substr(1));
    });

    // hashtagify terms from user dictionary
    if(hashtagDictionary){
      var termPos;

      hashtagifyText=' '+hashtagifyText;
      for(i=hashtagDictionary.length;i--;)
        if((termPos=hashtagifyText.toLowerCase().indexOf(' '+hashtagDictionary[i]))>-1){
          termPos++;
          hashtagifyText=hashtagifyText.substr(0,termPos)+'#'+hashtagifyText.substr(termPos,1).toUpperCase()+hashtagifyText.substr(termPos+1);
        }

      hashtagifyText=hashtagifyText.substr(1);
    }

    // finish replacements
    if(reps)
      for(i=0;i<reps.length;i++)
        hashtagifyText=hashtagifyText.replace('^'+(i),'#'+reps[i]);

    hashtagifyText=hashtagifyText.replace(/#{2,}/g,'#');

    log(hashtagifyText);

    return hashtagifyText;
  }

  hashtagify.debug=false;
  hashtagify.doFollowedByNumber=true;
  hashtagify.doDottedAndDashed=true;

  return hashtagify;
}));
