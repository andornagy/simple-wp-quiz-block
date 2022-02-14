<?php

/**
 * Plugin Name: Simple WP Quiz Block
 * Description: A quiz block
 * Version: 1.0
 * Author: Andor Nagy
 * Author URI: http://www.andornagy.com
 */

if (!defined('ABSPATH')) exit; // Exit if accessed directly

class SimpleWpQuizBlock {

   function __construct() {
      add_action('init', array($this, 'adminAssets'));
   }

   function adminAssets() {

      wp_register_style(
         'wpQuizBlockEditStyle',
         plugin_dir_url( __FILE__ ). 'build/index.css',
      );

      wp_register_script(
         'wpQuizBlockScript',
         plugin_dir_url( __FILE__ ). 'build/index.js',
         array( 'wp-blocks', 'wp-element', 'wp-components', 'wp-editor'),
      );

      register_block_type('andornagy/simple-wp-quiz-block',
         array(
            'editor_script'   => 'wpQuizBlockScript',
            'editor_style'    => 'wpQuizBlockEditStyle',
            'render_callback' => array($this, 'theHTML'),
         )
      );
   }

   function theHTML($attributes) {

      if (!is_admin()) {
         wp_enqueue_script('wpQuizBlockFrontend', plugin_dir_url( __FILE__ ). 'build/frontend.js', array('wp-element'));
         wp_enqueue_style('wpQuizBlockFrontendStyle',  plugin_dir_url( __FILE__ ). 'build/frontend.css');
      }

      ob_start(); ?>
      <div class="simple-wp-quiz-update-me">
         <pre display="none"><?php echo wp_json_encode($attributes) ?></pre>
      </div>

      <?php return ob_get_clean();
   }

}

$simpleWpQuizBlock = new SimpleWpQuizBlock();