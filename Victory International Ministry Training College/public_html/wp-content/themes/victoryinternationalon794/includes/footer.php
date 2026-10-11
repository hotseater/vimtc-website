<!--Footer -->
<footer>
        <div class="footer_top">
          <div class="wrapper">
            <div class="footer_top_con">
              <div class="gmap">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325.1270190219802!2d-112.13470699999999!3d33.550076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b6c84d0fb89fb%3A0x461059ed019ef47d!2s7702%20N%2035th%20Ave%20%232%2C%20Phoenix%2C%20AZ%2085051%2C%20USA!5e0!3m2!1sen!2sph!4v1707402365646!5m2!1sen!2sph" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>

              <div class="footer_top_info">
              <?php dynamic_sidebar('footer_top_info'); ?>
              </div>
              
              <div class="footer_top_flex">
                <div class="contact_info">
                <?php dynamic_sidebar('contact_info'); ?>
                </div>

                <div class="footer_logo_holder">
                  <div class="footer_logo">
                    <a href="<?php echo get_home_url(); ?>">
                      <figure><img src="<?php bloginfo('template_url'); ?>/images/footer-logo.png" alt="<?php echo get_bloginfo('name');?>"></figure>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer_btm">
          <div class="wrapper">
            <div class="footer_btm_con">
              <div class="footer_nav">
              <?php dynamic_sidebar('footer_nav'); ?>
                <h2>Site Navigation</h2>
                <?php wp_nav_menu( array('theme_location' => 'secondary' ) ); ?>            
              </div>

              <div class="copyright">
                &copy; Copyright
                <?php
						$start_year = '2025';
						$current_year = date('Y');
						$copyright = ($current_year == $start_year) ? $start_year : $current_year;
						echo $copyright;
						?> <q></q>
                <!--span class="footer_comp"><!?php //echo get_bloginfo('name');?>CompanyName</span-->
                <span class="privacy_policy"><a href="privacy-notice">Privacy Notice</a></span>
                <a class="copyright_text">Designed by</a> Proweaver
                <div class="footer_disclaimer">
                  <a href="/victory-international-ministry-training-college-do-not-sell-or-share-my-personal-information">Do Not Sell/Share My Personal Information</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <span class="back_top"></span>

    </div> <!-- End Clearfix -->
  </div> <!-- End Protect Me -->

  <!--?php get_includes('ie');?-->

  <script>(function(d){var s = d.createElement("script");s.setAttribute("data-account", "m1Y1yHo0MY");s.setAttribute("src", "https://cdn.userway.org/widget.js");(d.body || d.head).appendChild(s);})(document)</script><noscript>Please ensure Javascript is enabled for purposes of <a href="https://userway.org">website accessibility</a></noscript>

  <!--
  Solved HTML5 & CSS IE Issues

  <//?php bloginfo('template_url');?>/

  -->
  <script src="<?php bloginfo('template_url'); ?>/js/modernizr-custom-v2.7.1.min.js"></script>
  <!-- <script src="js/jquery-2.1.1.min.js"></script> -->
  <script src="<?php bloginfo('template_url'); ?>/js/jquery-3.5.0.min.js"></script>

  <!--
  Solved Psuedo Elements IE Issues
  -->
  <script src="<?php bloginfo('template_url'); ?>/js/calcheight.min.js"></script>
  <script src="<?php bloginfo('template_url'); ?>/js/jquery.easing.1.3.js"></script>
  <script src="<?php bloginfo('template_url'); ?>/js/jquery.skitter.min.js"></script>
  <script src="<?php bloginfo('template_url'); ?>/js/responsiveslides.min.js"></script>
  <script src="<?php bloginfo('template_url'); ?>/js/plugins.min.js"></script>
  <script src="<?php bloginfo('template_url'); ?>/js/wow.min.js"></script>
  <script src="<?php bloginfo('template_url'); ?>/js/owl.carousel.min.js"></script>
  <script src="<?php bloginfo('template_url'); ?>/js/jquery-migrate-1.4.1.min.js"></script>
  <script src='https://www.google.com/recaptcha/api.js'></script>
  <?php wp_footer(); ?>

</body>

</html>
<!-- End Footer -->