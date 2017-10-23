/* bender-tags: editor, colorbutton, 1008 */
/* bender-ckeditor-plugins: colorbutton,toolbar,wysiwygarea */

( function() {
	'use strict';

	bender.editor = true;

	function assertSelectedColor( colorButton, colorName, colorValue, colorIndex ) {
		assert.areSame( 'true', colorButton._.panel.getBlock( colorButton._.id ).element.find( 'a.cke_colorbox' ).getItem( colorIndex ).getAttribute( 'aria-selected' ) );
		assert.areSame( colorName, colorButton._.panel.getBlock( colorButton._.id ).element.find( 'a.cke_colorbox' ).getItem( colorIndex ).$.title );
		assert.areSame( colorValue, colorButton._.panel.getBlock( colorButton._.id ).element.find( 'a.cke_colorbox' ).getItem( colorIndex ).getAttribute( 'data-value' ) );
	}

	bender.test( {
		'test highlighted color with background color button': function() {
			var editor = this.editor,
				bgColorBtn = editor.ui.get( 'BGColor' );

			resume( function() {
				assertSelectedColor( bgColorBtn, 'Dark Gray', '999', 22 );
			} );

			bender.tools.selection.setWithHtml( editor, '<h1 style="background: #999999">{Moo}</h1>' );
			bgColorBtn.click( editor );

			wait();
		},

		'test highlighted color with text color button': function() {
			var editor = this.editor,
				txtColorBtn = editor.ui.get( 'TextColor' );

			resume( function() {
				assertSelectedColor( txtColorBtn, 'Black', '000', 23 );
			} );

			bender.tools.selection.setWithHtml( editor, '<h1 style="color: #000000;">{Moo}</h1>' );
			txtColorBtn.click( editor );

			wait();
		},

		'test highlighted color with background and text color button': function() {
			var editor = this.editor,
				txtColorBtn = editor.ui.get( 'TextColor' ),
				bgColorBtn = editor.ui.get( 'BGColor' );

			resume( function() {
				assertSelectedColor( bgColorBtn, 'Light Gray', 'DDD', 16 );

				txtColorBtn.click( editor );
				assertSelectedColor( txtColorBtn, 'White', 'FFF', 17 );
			} );

			bender.tools.selection.setWithHtml( editor, '<h1 style="color: #ffffff; background: #dddddd">{Moo}</h1>' );
			bgColorBtn.click( editor );

			wait();
		}
	} );
} )();
