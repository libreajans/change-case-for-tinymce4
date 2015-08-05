/**
| Add Change Case buttons for TinyMCE 4.x
|
| * UpperCase
| * LowerCase
| * SentenceCase
| * TitleCase
|
| Copyright, Sabri Ünal/Yakusha <yakushabb@gmail.com>
| Released under Creative Commons Attribution-NonCommercial 3.0 Unported License.
|
| Contributing:
| Sources:
| * http://stackoverflow.com/questions/11933577/javascript-convert-unicode-string-to-title-case
| * http://stackoverflow.com/questions/1850232/turkish-case-conversion-in-javascript
| * https://github.com/wp-plugins/change-case-for-tinymce
*/

function toProperCase( str ) {
	/**
	 This function convert
	 text to Title Case Format
	*/

    var i,
        j,
        chars,
        arr;

    arr = str.replace(/I/g,"ı").toLocaleLowerCase( ).split("");

    chars = {
        " " : true,
        "-" : true,
        ":" : true,
        "=" : true,
        "/" : true
    };

    for( var i = 0, j = -1; i < arr.length; i += 1, j += 1 ) {
        // if previous char (j) exists in chars and current (i) does not;
        // replace with uppercase equivalent.
        if ( ( arr[j] && chars[ arr[j] ] && !chars[ arr[i] ] ) || i === 0){
            arr[i] = arr[i].replace(/i/g,"İ").toLocaleUpperCase( );
        }
    }
    return arr.join("");
}

tinymce.PluginManager.add('upperCase', function(ed, url)
{
	ed.addButton('upperCase',
	{
		title : 'HEPSİ BÜYÜK HARF',
		image : url+'/uc.png',
		onclick : function()
		{
			String.prototype.upperCase = function()
			{
				return this.toLocaleUpperCase();
			}
			var sel = ed.dom.decode(ed.selection.getContent());
 			sel = sel.replace(/i/g,"İ").toLocaleUpperCase();
			ed.selection.setContent(sel);
			ed.save();
			ed.isNotDirty = true;
		}
	});
});

tinymce.PluginManager.add('lowerCase', function(ed, url)
{
	ed.addButton('lowerCase',
	{
		title : 'hepsi küçük harf',
		image : url+'/lc.png',
		onclick : function()
		{
			String.prototype.lowerCase = function()
			{
				return this.toLocaleLowerCase();
			}
			var sel = ed.dom.decode(ed.selection.getContent());
			sel = sel.replace(/I/g,"ı").toLocaleLowerCase();
			ed.selection.setContent(sel);
			ed.save();
			ed.isNotDirty = true;
		}
	});
});

tinymce.PluginManager.add('sentenceCase', function(ed, url)
{
	ed.addButton('sentenceCase',
	{
		title : 'Normal tümce düzeni',
		image : url+'/sc.png',
		onclick : function()
		{
			String.prototype.sentenceCase = function()
			{
				return this.toLocaleLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function(c)
				{
					return c.toLocaleUpperCase()
				});
			}
			var sel = ed.dom.decode(ed.selection.getContent());
			sel = sel.replace(/I/g,"ı").toLocaleLowerCase();
			sel = sel.sentenceCase();
			ed.selection.setContent(sel);
			ed.save();
			ed.isNotDirty = true;
		}
	});
});

tinymce.PluginManager.add('titleCase', function(ed, url)
{
	ed.addButton('titleCase',
	{
		title : 'Başlık Düzeni',
		image : url+'/tc.png',
		onclick : function()
		{
			var sel = ed.dom.decode(ed.selection.getContent());
			sel = toProperCase(sel);
			ed.selection.setContent(sel);
			ed.save();
			ed.isNotDirty = true;
		}
	});
});
