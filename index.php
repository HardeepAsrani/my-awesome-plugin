<?php
/**
 * Plugin Name:       My Awesome Plugin
 * Description:       I build, therefore I'm awesome.
 * Version:           1.0.0
 * Author:            Hardeep Asrani
 * Author URI:        https://codeinwp.com
 * License:           GPL-3.0+
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain:       textdomain
 */

define( 'CODEINWP_AWESOME_PLUGIN_VERSION', '1.0.0' );

function codeinwp_options_assets() {
	wp_enqueue_script( 'codeinwp-awesome-plugin-script', plugins_url( '/', __FILE__ ) . 'build/build.js', array( 'wp-api', 'wp-i18n', 'wp-components', 'wp-element' ), CODEINWP_AWESOME_PLUGIN_VERSION, true );
	wp_enqueue_style( 'codeinwp-awesome-plugin-style', plugins_url( '/', __FILE__ ) . 'build/build.css', array( 'wp-components' ) );
}

function codeinwp_menu_callback() {
	echo '<div id="codeinwp-awesome-plugin"></div>';
}

function codeinwp_add_option_menu() {
	$page_hook_suffix = add_options_page(
		__( 'Awesome Plugin', 'textdomain' ),
		__( 'Awesome Plugin', 'textdomain' ),
		'manage_options',
		'awesome',
		'codeinwp_menu_callback'
	);

	add_action( "admin_print_scripts-{$page_hook_suffix}", 'codeinwp_options_assets' );
}

add_action( 'admin_menu', 'codeinwp_add_option_menu' );

function codeinwp_register_settings() {
	register_setting(
		'codeinwp_settings',
		'codeinwp_analytics_status',
		array(
			'type'         => 'boolean',
			'show_in_rest' => true,
			'default'      => false,
		)
	);

	register_setting(
		'codeinwp_settings',
		'codeinwp_analytics_key',
		array(
			'type'         => 'string',
			'show_in_rest' => true,
		)
	);
}

add_action( 'init', 'codeinwp_register_settings' );
