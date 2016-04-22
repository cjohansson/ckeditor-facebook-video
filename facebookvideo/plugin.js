/**
 * Facebook-Video plugin for CKEditor
 *
 * @author Christian Johansson <christian@cvj.se>
 * @license MIT
 */

/**
 * Add plugin to CKEDITOR plugin-list.
 */
CKEDITOR.plugins.add('facebookvideo',
{
    init: function(editor)
    {
        CKEDITOR.dialog.add("facebookvideoDialog", function (c)
        {
            return{title: 'Enter Facebook video URL', minWidth: 400, minHeight: 75, contents: [
                {id: "tab-basic", label: "Basic Settings", elements: [
                    {type: "text", id: "facebookvideoURL", label: 'URL' }
                ]}
            ], onOk: function ()
            {

                var b = this.getValueOf("tab-basic", "facebookvideoURL").trim().match(/videos\/([^&$]+)\//i);

                if (null == b
                    || "" == b
                    || "" == b[0]
                    || "" == b[1]
                ) {
                    alert('URL was invalid! It should be similar to \n\n\t https://www.facebook.com/ChannelId/videos/12345/ \n\n Try again!');
                    return false;
                }

                var a = c.document.createElement("iframe");
                a.setAttribute("width", "500");
                a.setAttribute("height", "281");
                a.setAttribute("src", "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F" + b[1] + "%2F&width=500&show_text=false&height=281");
                a.setAttribute("frameborder", "0");
                a.setAttribute("allowfullscreen", "1");
                c.insertElement(a)

            }}
        });

        // Add command
        editor.addCommand('facebookvideoDialog', new CKEDITOR.dialogCommand("facebookvideoDialog"));

        /// Add UI toolbar button
        editor.ui.addButton('facebookvideo',
        {
                label: 'Embed Facebook video',
                command: 'facebookvideoDialog',
                icon: this.path + 'images/facebook-16x16.png'
        });

    }
});
