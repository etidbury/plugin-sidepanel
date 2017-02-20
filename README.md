#Side Panel Plugin


##Setup

1. Include this structure in your HTML page (Note: Selectors can be changed, *Go to 'Configuration' for details*).
    ```html
    <body>
      <aside id='panel-1'>
    
        <div>
          [SIDE PANEL CONTENT HERE]
        </div>
      </aside>
    
      <main>
        <a href='#' id='sidepanel-overlay-close' />
 
        [YOUR PAGE CONTENT HERE]
      </main>
    
    </body>
    ```
2. Add ```@include 'plugin-sidepanel';``` to default SASS file (or use dist/css/default.css for a compiled version).
3. To prevent main content from being scaled upon opening side panel:

    Add this snippet inside the ```<body>``` tag 
    
    ```javascript
    // no width change of main content
    (function (mainSelector,overlayCloseID,$main) {
        jQuery('#'+overlayCloseID).remove();
        $main=jQuery(mainSelector);
        $main.html('<div>'+$main.html()+'</div>');
        $main.prepend("<a href='#' id='"+overlayCloseID+"'></a>");
        jQuery(mainSelector+' > *').css({minWidth:$main.width()+'px'});
    })('main','sidepanel-overlay-close');
    ```
    *Note: Change 'main' and 'sidepanel-overlay-close' to the necessary selectors if needed*

##Features

- Pure CSS3 and HTML mechanism utilising ```:target``` and ```flex```
- Fully Responsive including support of Desktop HD screens
- Optional jQuery Snippet to prevent main content from being resized when toggling the side panel.

##Configuration

SASS Configuration for selectors
```sass
$selector-menu: aside
$selector-content: main
$selector-overlay-close: #sidepanel-overlay-close
```
