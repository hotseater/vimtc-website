 <!-- Banner -->
 <div id="banner">
        <div class="wrapper">
          <div class="bnr_con">
          <?php if (is_front_page() ) { ?>
            <div class="slider">
              <div class="box_skitter box_skitter_large">
                <ul>
                  <li>
                    <figure><img class="random" src="<?php bloginfo('template_url'); ?>/images/slider/1.jpg" alt="Teacher holding the certification" /></figure>
                  </li>
                  <li>
                    <figure><img class="random" src="<?php bloginfo('template_url'); ?>/images/slider/2.jpg" alt="Portray of a Teachers" /></figure>
                  </li>
                  <li>
                    <figure><img class="random" src="<?php bloginfo('template_url'); ?>/images/slider/3.jpg" alt="Graduation ceremony" /></figure>
                  </li>
                </ul>
              </div>
              <ul class="rslides">
                <li>
                  <figure><img src="<?php bloginfo('template_url'); ?>/images/slider/rslides/1.jpg" alt="Teacher holding the certification" /></figure>
                </li>
                <li>
                  <figure><img src="<?php bloginfo('template_url'); ?>/images/slider/rslides/2.jpg" alt="Portray of a Teachers" /></figure>
                </li>
                <li>
                  <figure><img src="<?php bloginfo('template_url'); ?>/images/slider/rslides/3.jpg" alt="Graduation ceremony" /></figure>
                </li>
              </ul>
            </div>

            <div class="bnr_info wow animated fadeInLeft" data-wow-duration="2045ms">
              <?php dynamic_sidebar('bnr_info'); ?>         
            </div>

            <?php } else { ?>
         <div class="non_ban">
           <div class="non_ban_img">
             <?php if(is_home() && is_author() && is_category() && is_tag() && is_single()) { ?>
             <?php if (has_post_thumbnail() ) {?>
             <?php the_post_thumbnail('full');?>
             <?php }else{ ?>
             <figure><img src="<?php bloginfo('template_url');?>/images/non-home-banner.jpg" alt="Graduating students with the teacher" /></figure>
             <?php } ?>
             <?php } elseif (has_post_thumbnail() ) { ?>
             <?php the_post_thumbnail('full');?>
             <?php } else { ?>
             <img src="<?php bloginfo('template_url'); ?>/images/non-home-banner.jpg" alt="Graduating students with the teacher">
             <?php } ?>
           </div>

           <div class="page_title">
             <?php if(!is_home() && !is_author() && !is_category() && !is_tag() && !is_single()) { ?>
             <h1 class="h1_title"><?php the_title(); ?></h1>
             <?php echo do_shortcode("[short_title id='" . get_the_ID() . "']"); ?>
             <?php } else { ?>
             <h1 class="h1_title">Blog</h1>
             <?php } ?>
           </div>
         </div>
         <?php }?>

          </div>
        </div>
      </div>
      <!-- End Banner -->