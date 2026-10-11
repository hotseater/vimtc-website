<!-- home pop-up -->

<!-- < ?php if(is_front_page()){ ?>
  <div id="Modal">
    <div id="Mod_container">
      <div id="modboxcolor">
        <div class="close"><p>&times;</p></div>
          <div class="Mod_text">
            <figure><img src="< ?php bloginfo('template_url');?>/images/pop-img-vimtc.jpg" alt="< ?php echo get_bloginfo('name');?>"></figure>
          </div>
      </div>
    </div>
  </div>
< ?php } ?> -->

<!-- Header -->

<div class="header_fix">
        <div class="header_holder">
          <header>
            <div class="wrapper">
              <div class="header_con">
                <div class="main_logo">
                  <a href="<?php echo get_home_url(); ?>">
                    <figure><img src="<?php bloginfo('template_url'); ?>/images/main-logo.png" alt="<?php echo get_bloginfo('name');?>" /></figure>
                  </a>
                </div>

                <div class="head_info">
                  <div class="header_info">
                 
                  </div>
                  
                  <div class="social_media">
                    <ul>
                      <li><a href="https://www.facebook.com/profile.php?id=61558005628887&mibextid=ZbWKwL" target="_blank">
                          <figure><img src="<?php bloginfo('template_url'); ?>/images/fb-icon.png" alt="facebook" /></figure>
                        </a></li>
                      <li><a href="https://x.com/VimtcPhx?t=Do5of9zCER-JU84ymBk3mg&s=09" target="_blank">
                          <figure><img src="<?php bloginfo('template_url'); ?>/images/twitter-icon.png" alt="twitter" /></figure>
                        </a></li>
                    </ul>
                    <?php dynamic_sidebar('social_media'); ?>
                      
                  </div>
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
          </header>
          <!-- End Header -->