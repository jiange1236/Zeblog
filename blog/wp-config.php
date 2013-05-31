<?php
/** 
 * WordPress 基础配置文件。
 *
 * 本文件包含以下配置选项：MySQL 设置、数据库表名前缀、密钥、
 * WordPress 语言设定以及 ABSPATH。如需更多信息，请访问
 * {@link http://codex.wordpress.org/zh-cn:%E7%BC%96%E8%BE%91_wp-config.php
 * 编辑 wp-config.php} Codex 页面。MySQL 设置具体信息请咨询您的空间提供商。
 *
 * 这个文件用在于安装程序自动生成 wp-config.php 配置文件，
 * 您可以手动复制这个文件，并重命名为“wp-config.php”，然后输入相关信息。
 *
 * @package WordPress
 */

// ** MySQL 设置 - 具体信息来自您正在使用的主机 ** //
/** WordPress 数据库的名称 */
define('DB_NAME', 'raewGwLBzjYVWQtFGZhU');

/** MySQL 数据库用户名 */
define('DB_USER', '5XxEqo1fPzG94tu55gQ3gceP');

/** MySQL 数据库密码 */
define('DB_PASSWORD', 'l6Y8OC8XMkuh9AlO06B04HmC6P7tGkCl');

/** MySQL 主机 */
define('DB_HOST', 'sqld.duapp.com:4050');

/** 创建数据表时默认的文字编码 */
define('DB_CHARSET', 'utf8');

/** 数据库整理类型。如不确定请勿更改 */
define('DB_COLLATE', '');
/** BCMS queue Name */
define('BCMS_QUEUE', '');

/**#@+
 * 身份认证密匙设定。
 *
 * 您可以随意写一些字符
 * 或者直接访问 {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org 私钥生成服务}，
 * 任何修改都会导致 cookie 失效，所有用户必须重新登录。
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         ':d(QUu?m<zxK@|viqhf&kH~uR^2>A0=T}:*}$wjix-QX=$FGK45$_Y[R&z=vN}T|');
define('SECURE_AUTH_KEY',  '1OHi9#BwgIob%,P(EA]ed8{luDS~KLsXyhcjUR PwGj,#*CmPy1KiH{q}*2eZ=MJ');
define('LOGGED_IN_KEY',    '3j)iFS7LEFTNL!v-OZtRXbO@F; v{Mge`8umMyLRAHYA/v`$`3D;,uS3~:EoAmT5');
define('NONCE_KEY',        'rgS&ForKebLW7{#l/uw*%UzI[M+]zb#]= %1Iq1!a&g&]yC6m$7lVq%i%`Ykwy*+');
define('AUTH_SALT',        'zi9`;nqRo,gvD-U t8N2{,{xQI`OfVF)i[gpNF/xK8|x)AYFSgAOrV7[#|kvO<J>');
define('SECURE_AUTH_SALT', '~K/@dA ,PU7GkFZI)ua>57Wh>@,E/}^$kNI/.wEY! Uj*(AdPH>qnv=q]h@cQ;(J');
define('LOGGED_IN_SALT',   '79(OBila3oO2@0XH=/)<1L{:G<M07KKy[9PA/iIIj2m;(n5eg+J8^pF^EtIAD~l@');
define('NONCE_SALT',       '+!OCq@Dwi.jLI_GZh)vtbW^Mg:A0Ar5-IH*.j|!A<BsZsVJ1WZK5`q:CPk;9on?[');

/**#@-*/

/**
 * WordPress 数据表前缀。
 *
 * 如果您有在同一数据库内安装多个 WordPress 的需求，请为每个 WordPress 设置不同的数据表前缀。
 * 前缀名只能为数字、字母加下划线。
 */
$table_prefix  = 'wp_';

/**
 * WordPress 语言设置，中文版本默认为中文。
 *
 * 本项设定能够让 WordPress 显示您需要的语言。
 * wp-content/languages 内应放置同名的 .mo 语言文件。
 * 要使用 WordPress 简体中文界面，只需填入 zh_CN。
 */
define('WPLANG', 'zh_CN');

/**
 * 开发者专用：WordPress 调试模式。
 *
 * 将这个值改为“true”，WordPress 将显示所有用于开发的提示。
 * 强烈建议插件开发者在开发环境中启用本功能。
 */
define('WP_DEBUG', false);

/* 好了！请不要再继续编辑。请保存本文件。使用愉快！ */

/** WordPress 目录的绝对路径。 */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** 设置 WordPress 变量和包含文件。 */
require_once(ABSPATH . 'wp-settings.php');
