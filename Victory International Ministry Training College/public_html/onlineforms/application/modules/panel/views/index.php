<!--wrapper-->

<div id="wrapper">


    <header id="header" class="">
        <div class="container">
            <ul>
                <!-- <li><a href="javascript:;"><?= $_SESSION['username']; ?></a></li> -->
                <li><a href="javascript:;" class="password-wrapper">Change Password</a></li>
                <li><a href="<?= base_url() ?>/logout" class="logout-wrapper">Logout</a></li>
            </ul>
        </div>
    </header>


    <div class="purple-bg"></div>
    <div class="skyblue-bg"></div>
    <div id="main" class="clearfix">



        <!--Banner-->

        <div id="banner">

            <div class="container banner-container">

                <div class="comp-info f-left">

                    <div class="comp-logo">

                        <a href="">

                            <img class="logo" src="<?= base_url() ?>assets/images/logo.png" width="50px" height="50px" alt="logo">

                            <div class="title">

                                <h2>ONLINE FORMS</h2>

                                <h4>DATABASE</h4>

                            </div>

                        </a>

                    </div>

                    <div class="comp-name">
                        <span><?= get_bloginfo('name'); ?></span>
                    </div>

                </div>



                <div class="f-right">

                    <ul class="right-list">

                        <li>

                            <form id="searchform" method="post" action="">

                                <input id="searchinput" type="text" name="form_search" placeholder="Enter keyword...">

                                <button id="search" href="javascript:;"><img width="15px" height="15px" src="<?= base_url() ?>assets/images/search-icon-white.png" alt="Search"></button>

                            </form>

                        </li>

                        <li id="trash-list"><a id="trash" href="javascript:;"><img src="<?= base_url() ?>assets/images/trash-icon.png" alt="Trash">Trash</a></li>

                        <li id="inbox-list"><a id="inbox" href="javascript:;"><span> Inbox (0)</span></a></li>


                    </ul>

                </div>

            </div>

        </div>

        <!--end banner-->


        <div class="container email-container">

            <div class="email-list">
                <div class="list-border-header"></div>
                <div class="list-header"><span><input class="bulk_checkbox" type="checkbox" name="bulk-action"></span><span class="title-nav">Select All</span>
                    <span style="display: flex;flex-wrap: wrap;justify-content: space-between;gap: 11px; margin-right: 7px;">
                        <a href="javascript:;" id="bulk-print" data-id="print-all" title="Print">

                            <img src="<?= base_url() ?>assets/images/print-icon.png" alt="Print">

                        </a>
                        <a href="javascript:;" id="bulk-delete" data-id="delete-all" title="Delete">

                            <img src="<?= base_url() ?>assets/images/delete-icon.png" alt="Delete">

                        </a>
                    </span>
                </div>
                <div class="email-table">
                    <table id="email_list">

                    </table>
                </div>

                <div class="tableinfo pagination-container">
                    <div id="pagination-info"></div>
                    <div id="pagination"></div>
                </div>

            </div>

            <div class="form_pane email-content">

                <div class="show-subject">

                </div>

                <hr class="border-line">


                <div class="show-attachment">

                </div>

                <div class="showtable">

                    <p id="no-email">To view an email, click on it.</p>

                </div>
                <div class="selected-emails" style="display:none;">
                    <div style="text-align:start; text-color:#000">
                        <p class="email-selected-message">(<span id="email_counter"></span>) messages selected</p>
                    </div>
                    <div id="s-emails"></div>
                </div>
            </div>

        </div>

    </div>

</div>