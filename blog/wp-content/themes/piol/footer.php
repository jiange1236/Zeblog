<?php
global $options;
foreach ($options as $value) {
    if (get_settings( $value['id'] ) === FALSE) { $$value['id'] = $value['std']; } else { $$value['id'] = get_settings( $value['id'] ); }
}
?>
	</div>
	<div id="footer">
		<a id="gotop" href="#top" title="返回顶部">返回顶部</a>
		<span>
		&copy; 2011 <a href="<?php echo home_url( '/' ); ?>" title="<?php bloginfo( 'name' ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a> / Powered by <a href="http://wordpress.org/" title="优雅的个人发布平台" target="_blank" rel="generator">WordPress</a> / Piol Theme by <a href="http://c7sky.com/" title="Designed By Cople" target="_blank">C7SKY.COM</a>
		</span>
	</div>
</div>
<?php if ($piol_tongji) { ?><div class="tongji"><?php echo stripslashes($piol_tongji); ?></div><?php } ?>
<script src="<?php bloginfo('template_url'); ?>/js/ready.js"></script>
<!--[if IE 6]><script src="<?php bloginfo('template_url'); ?>/js/DD_belatedPNG.js"></script><script>DD_belatedPNG.fix('#header,#masthead,#logo img,#rss img,.col-top,.col-mid,.col-btm,.aside-top,.aside-mid,.aside-btm,#footer')</script><![endif]-->
<?php wp_footer(); ?>
</body>
</html>