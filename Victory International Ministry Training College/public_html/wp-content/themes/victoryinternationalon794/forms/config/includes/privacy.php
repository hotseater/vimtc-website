<?php

/**
 * Centralized Clauses System - Ecommerce & Non-Ecommerce Support
 * 
 * This file contains centralized clause definitions for forms across the application.
 * It automatically switches between ecommerce and non-ecommerce clauses based on
 * the Ecommerce constant defined in config.php.
 * 
 * @package    Forms
 * @subpackage Privacy
 * @author     CrisPSiopao
 * @version    3.1.0
 * @since      2025
 */

// =============================================================================
// CONFIGURATION CHECK
// =============================================================================

// Check if Ecommerce constant is defined, default to false if not
if (!defined('Ecommerce')) {
    define('Ecommerce', false);
}

// Check if FORM_VERSION constant is defined, default to empty if not
if (!defined('FORM_VERSION')) {
    define('FORM_VERSION', '');
}

// =============================================================================
// FORM VERSION CONFIGURATION
// =============================================================================

/**
 * Form Version Date
 * 
 * Date when the privacy clause was last updated.
 * Format: MMDDYY (e.g., 091025 for September 10, 2025)
 * 
 * @var string $form_version_date
 */
$form_version_date = '091025'; // Update this date when clause is modified (MMDDYY format)

/**
 * Complete Form Version String
 * 
 * Combines version number from config.php with date from privacy.php
 * Format: V.5-091025
 * 
 * @var string $form_version_complete
 */
$form_version_complete = FORM_VERSION . '-' . $form_version_date;

/**
 * Form Version Output for Email
 * 
 * HTML formatted form version to be added at the end of email submissions.
 * This ensures the form version always appears last, regardless of where
 * the privacy notice clause appears in the form.
 * 
 * @var string $form_version_output
 */
$form_version_output = '<tr><td colspan="3" style="line-height:30px; padding-top: 10px;">
    <span class="light-grey">Form Version: ' . $form_version_complete . '</span>
</td></tr>';

// =============================================================================
// PRIVACY NOTICE CLAUSES - CONDITIONAL BASED ON ECOMMERCE SETTING
// =============================================================================

if (Ecommerce) {
    // =========================================================================
    // ECOMMERCE CLAUSES
    // =========================================================================

    /**
     * Ecommerce Privacy Notice - Email Output Text
     * 
     * Complete HTML table row structure for ecommerce sites with additional data processing
     * and marketing consent clauses.
     * Includes "Evidence of Consent:" and checkbox with consent text for email submissions.
     * Note: Form version is separate and should be added at the end using $form_version_output.
     * 
     * @var string $privacy_notice_output
     */
    $privacy_notice_output = '<tr><td colspan="3" style="line-height:30px">
                        <style>span.light-grey {color: #949191 !important;}</style>
                        <span class="light-grey">Evidence of Consent:<br/>
                        [Checkbox Checked] I consent to the collection, use, storage, and processing of my personal and, where applicable, health-related information, including any data I submit on behalf of others, for the purpose of managing my inquiry, order, account, or subscription. This includes order fulfillment, payment processing, and customer service, in accordance with the Privacy Notice.</span>
                    </td></tr>';

    /**
     * Ecommerce Privacy Notice - Form Display HTML
     * 
     * Complete HTML structure for ecommerce privacy notice checkbox.
     * Includes additional marketing and data processing consent.
     * 
     * @var string $privacy_notice_text
     */
    $privacy_notice_text = '
    <div class="disclaimer">
        <p><input type="checkbox" name="Privacy_Notice" style="-webkit-appearance:checkbox" /> <b>I consent to the collection, use, storage, and processing of my personal and, where applicable, health-related information, including any data I submit on behalf of others, for the purpose of managing my inquiry, order, account, or subscription. This includes order fulfillment, payment processing, and customer service, in accordance with the <a href="/privacy-notice" target="_blank">Privacy Notice</a>.</b></p>
    </div>';

    /**
     * Ecommerce Privacy Notice - Bootstrap Version
     * 
     * Bootstrap-styled version for modern forms.
     * 
     * @var string $privacy_notice_text_bootstrap
     */
    $privacy_notice_text_bootstrap = '
    <div class="form-check mb-3 mt-3">
        <input type="checkbox" class="form-check-input" id="Privacy_Notice" name="Privacy_Notice" required>
        <label class="form-check-label" for="Privacy_Notice">I consent to the collection, use, storage, and processing of my personal and, where applicable, health-related information, including any data I submit on behalf of others, for the purpose of managing my inquiry, order, account, or subscription. This includes order fulfillment, payment processing, and customer service, in accordance with the <a href="/privacy-notice" target="_blank">Privacy Notice</a>.</label>
    </div>';

    /**
     * Ecommerce Privacy Notice - Bottom Text
     * 
     * Text version for footer or bottom placement.
     * 
     * @var string $privacy_notice_bottom
     */
    $privacy_notice_bottom = 'I consent to the collection, use, storage, and processing of my personal and, where applicable, health-related information, including any data I submit on behalf of others, for the purpose of managing my inquiry, order, account, or subscription. This includes order fulfillment, payment processing, and customer service, in accordance with the <a href="/privacy-notice" target="_blank">Privacy Notice</a>.';
} else {
    // =========================================================================
    // NON-ECOMMERCE CLAUSES
    // =========================================================================

    /**
     * Non-Ecommerce Privacy Notice - Email Output Text
     * 
     * Complete HTML table row structure for non-ecommerce sites with standard
     * data collection consent.
     * Includes "Evidence of Consent:" and checkbox with consent text for email submissions.
     * Note: Form version is separate and should be added at the end using $form_version_output.
     * 
     * @var string $privacy_notice_output
     */
    $privacy_notice_output = '<tr><td colspan="3" style="line-height:30px">
                        <style>span.light-grey {color: #949191 !important;}</style>
                        <span class="light-grey">Evidence of Consent:<br/>
                        [Checkbox Checked] I consent to the collection, use, storage, and processing of my personal and, where applicable, health-related information, including any data I submit on behalf of others, for the purpose of evaluating or fulfilling my request made through this form. I understand this will be handled in accordance with the Privacy Notice.</span>
                    </td></tr>';

    /**
     * Non-Ecommerce Privacy Notice - Form Display HTML
     * 
     * Complete HTML structure for non-ecommerce privacy notice checkbox.
     * Standard data collection consent without marketing clauses.
     * 
     * @var string $privacy_notice_text
     */

    $privacy_notice_text = '
    <div class="disclaimer">
        <p><input type="checkbox" name="Privacy_Notice" style="-webkit-appearance:checkbox" /> <b>I consent to the collection, use, storage, and processing of my personal and, where applicable, health-related information, including any data I submit on behalf of others, for the purpose of evaluating or fulfilling my request made through this form. I understand this will be handled in accordance with the <a href="/privacy-notice" target="_blank">Privacy Notice</a>.</b></p>
    </div>';


    /**
     * Non-Ecommerce Privacy Notice - Bootstrap Version
     * 
     * Bootstrap-styled version for modern forms.
     * 
     * @var string $privacy_notice_text_bootstrap
     */


    $privacy_notice_text_bootstrap = '
<div class="form-check mb-3 mt-3">
<input type="checkbox" class="form-check-input" id="Privacy_Notice" name="Privacy_Notice" required>
        <label class="form-check-label" for="Privacy_Notice">I consent to the collection, use, storage, and processing of my personal and, where applicable, health-related information, including any data I submit on behalf of others, for the purpose of evaluating or fulfilling my request made through this form. I understand this will be handled in accordance with the <a href="/privacy-notice" target="_blank">Privacy Notice</a>.
        </label>
        <div class="invalid-feedback"></div>
    </div>';

    /**
     * Non-Ecommerce Privacy Notice - Bottom Text
     * 
     * Text version for footer or bottom placement.
     * 
     * @var string $privacy_notice_bottom
     */
    $privacy_notice_bottom = 'I consent to the collection, use, storage, and processing of my personal and, where applicable, health-related information, including any data I submit on behalf of others, for the purpose of evaluating or fulfilling my request made through this form. I understand this will be handled in accordance with the <a href="/privacy-notice" target="_blank">Privacy Notice</a>.';
}

// =============================================================================
// ADDITIONAL CLAUSES
// =============================================================================

/**
 * Another Clause - Email Output Text
 * 
 * Plain text version for email notifications.
 * 
 * @var string $another_clause_output
 */
$another_clause_output = 'This is a test checkbox for another clause.';

/**
 * Another Clause - Form Display HTML
 * 
 * Complete HTML structure for additional clause checkbox.
 * 
 * @var string $another_clause_text
 */
$another_clause_text = '
<div class="form-check mb-3 mt-3">
    <input type="checkbox" class="form-check-input" id="Another_Clause" name="Another_Clause" required>
    <label class="form-check-label" for="Another_Clause">
        This is a test checkbox for another clause.
    </label>
    <div class="invalid-feedback"></div>
</div>';

/**
 * Terms and Conditions - Email Output Text
 * 
 * Plain text version for email notifications.
 * 
 * @var string $terms_conditions_output
 */
$terms_conditions_output = 'I agree to the terms and conditions of this application.';

/**
 * Terms and Conditions - Form Display HTML
 * 
 * Complete HTML structure for terms and conditions checkbox.
 * 
 * @var string $terms_conditions_text
 */
$terms_conditions_text = '
<div class="form-check mb-3 mt-3">
    <input type="checkbox" class="form-check-input" id="Terms_Conditions" name="Terms_Conditions" required>
    <label class="form-check-label" for="Terms_Conditions">
        I agree to the terms and conditions of this application.
    </label>
    <div class="invalid-feedback"></div>
</div>';

// =============================================================================
// USAGE EXAMPLES
// =============================================================================

/**
 * FORM DISPLAY USAGE:
 * 
 * <?php
 * include 'config/includes/privacy.php';
 * echo $privacy_notice_text;
 * echo $terms_conditions_text;
 * ?>
 * 
 * EMAIL PROCESSING USAGE:
 * 
 * } else if ($key == "Privacy_Notice") {
 *     $body .= $privacy_notice_output;
 * } else if ($key == "Marketing_Consent") { // Only for ecommerce
 *     $body .= $marketing_consent_output;
 * }
 * 
 * CONFIGURATION:
 * 
 * In config.php, set:
 * define('Ecommerce', true);  // For ecommerce sites
 * define('Ecommerce', false); // For non-ecommerce sites
 * 
 * 
 * ONLINEFORMS:
 * 
 * - on onlineforms/assets/css/my_style.css and my_style.min.css add the following code:
 * span.light-grey {
 *     color: #949191;
 * }
 * 
 * - on onlineforms/assets/css/view_email.css and view_email.min.css add the following code:
 * span.light-grey {
 *     color: #949191;
 * }
 * 
 * 
 * MAINTENANCE:
 * 
 * To update clause text or HTML structure, modify the variables above.
 * All forms using this system will automatically reflect the changes.
 * The system automatically switches between ecommerce and non-ecommerce clauses.
 */
