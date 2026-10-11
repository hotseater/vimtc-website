<?php
defined('ACCESSIBLE') or exit('No direct script access allowed');
require_once 'core/Controller.php';
class Template extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    // Override __call() magic method to handle any undefined method calls
    public function __call($method, $arguments)
    {
        $this->index();
    }
  
    public function loadTemplate($form)
    {
        $data['input'] = new Controller();
        if(!file_exists('./views/templates/' . $form . '.php')){
            return $this->index();
        }
        $this->load->template($form, $data);
    }

    public function index(){
        $this->loadTemplate('index');
    }

    /* Function Insert Location */

    public function InvoiceForm()
    {
        $this->loadTemplate('InvoiceForm');
    }

    public function InvoiceForm2()
    {
        $this->loadTemplate('InvoiceForm2');
    }

    public function teststest()
    {
        $this->loadTemplate('teststest');
    }

    public function GetQuote_Sample()
    {
        $this->loadTemplate('GetQuote-Sample');
    }

    public function admissionCollege()
    {
        $this->loadTemplate('admissionCollege');
    }

    public function admissionForm()
    {
        $this->loadTemplate('admissionForm');
    }

    public function admissionMedicalTraining()
    {
        $this->loadTemplate('admissionMedicalTraining');
    }

    public function admissionPreschool()
    {
        $this->loadTemplate('admissionPreschool');
    }

    public function ApplicationForm()
    {
        $this->loadTemplate('ApplicationForm');
    }

    public function appointmentForm()
    {
        $this->loadTemplate('appointmentForm');
    }

    public function AutoRefills()
    {
        $this->loadTemplate('AutoRefills');
    }

    public function clientreferralForm()
    {
        $this->loadTemplate('clientreferralForm');
    }

    public function clientReferralGenForm()
    {
        $this->loadTemplate('clientReferralGenForm');
    }

    public function clientSatisfactionForm()
    {
        $this->loadTemplate('clientSatisfactionForm');
    }

    public function consultationForm()
    {
        $this->loadTemplate('consultationForm');
    }

    public function contactForm_Fullname()
    {
        $this->loadTemplate('contactForm_Fullname');
    }

    public function contactForm()
    {
        $this->loadTemplate('contactForm');
    }
    
    public function contactForm2_Fullname()
    {
        $this->loadTemplate('contactForm2_Fullname');
    }

    public function CreditApplicationForm()
    {
        $this->loadTemplate('CreditApplicationForm');
    }

    public function deliveryAreasForm()
    {
        $this->loadTemplate('deliveryAreasForm');
    }

    public function deliveryPharmacyForm()
    {
        $this->loadTemplate('deliveryPharmacyForm');
    }

    public function Donation()
    {
        $this->loadTemplate('Donation');
    }

    public function employeesatisfactoryForm()
    {
        $this->loadTemplate('employeesatisfactoryForm');
    }

    public function EmploymentChildCareForm()
    {
        $this->loadTemplate('EmploymentChildCareForm');
    }

    public function employmentForm()
    {
        $this->loadTemplate('employmentForm');
    }

    public function EmploymentGeneralTransportForm()
    {
        $this->loadTemplate('EmploymentGeneralTransportForm');
    }

    public function EmploymentMedTransportationForm()
    {
        $this->loadTemplate('EmploymentMedTransportationForm');
    }

    public function EnrollmentForm()
    {
        $this->loadTemplate('EnrollmentForm');
    }

    public function FacilityForm()
    {
        $this->loadTemplate('FacilityForm');
    }

    public function FCC_ConsentForm()
    {
        $this->loadTemplate('FCC_ConsentForm');
    }

    public function FoodDeliveryForm()
    {
        $this->loadTemplate('FoodDeliveryForm');
    }

    public function FormGuide()
    {
        $this->loadTemplate('FormGuide');
    }

    public function freedeliveryForm()
    {
        $this->loadTemplate('freedeliveryForm');
    }

    public function genericOrderForm()
    {
        $this->loadTemplate('genericOrderForm');
    }

    public function GetQuote()
    {
        $this->loadTemplate('GetQuote');
    }

    public function inquiryForm()
    {
        $this->loadTemplate('inquiryForm');
    }

    public function jobOrderStaffingRequestForm()
    {
        $this->loadTemplate('jobOrderStaffingRequestForm');
    }

    public function JobSeekersForm()
    {
        $this->loadTemplate('JobSeekersForm');
    }

    public function logistics_TransportShipmentForm()
    {
        $this->loadTemplate('logistics_TransportShipmentForm');
    }

    public function logisticsForm()
    {
        $this->loadTemplate('logisticsForm');
    }

    public function messageForm()
    {
        $this->loadTemplate('messageForm');
    }

    public function mortgageQualificationForm()
    {
        $this->loadTemplate('mortgageQualificationForm');
    }

    public function newPharmacyCustomerForm()
    {
        $this->loadTemplate('newPharmacyCustomerForm');
    }

    public function newsletterForm()
    {
        $this->loadTemplate('newsletterForm');
    }

    public function onlineJobOrderForm()
    {
        $this->loadTemplate('onlineJobOrderForm');
    }

    public function PrayerRequestForm()
    {
        $this->loadTemplate('PrayerRequestForm');
    }

    public function referralForm()
    {
        $this->loadTemplate('referralForm');
    }

    public function refillRXForm()
    {
        $this->loadTemplate('refillRXForm');
    }

    public function registrationForm()
    {
        $this->loadTemplate('registrationForm');
    }

    public function requestMoreInfoForm()
    {
        $this->loadTemplate('requestMoreInfoForm');
    }

    public function reservationForm()
    {
        $this->loadTemplate('reservationForm');
    }

    public function reservationFormMedicalTransportation()
    {
        $this->loadTemplate('reservationFormMedicalTransportation');
    }

    public function reservationFormTransportation()
    {
        $this->loadTemplate('reservationFormTransportation');
    }

    public function reservationHotelForm()
    {
        $this->loadTemplate('reservationHotelForm');
    }

    public function reservationRestaurantForm()
    {
        $this->loadTemplate('reservationRestaurantForm');
    }

    public function reservationTravelForm()
    {
        $this->loadTemplate('reservationTravelForm');
    }

    public function ReturnExchangeForm()
    {
        $this->loadTemplate('ReturnExchangeForm');
    }

    public function RXOrderForm()
    {
        $this->loadTemplate('RXOrderForm');
    }

    public function Schedule_Pick_Up_DropOffForm()
    {
        $this->loadTemplate('Schedule_Pick_Up_DropOffForm');
    }

    public function SellPropertiesForm()
    {
        $this->loadTemplate('SellPropertiesForm');
    }

    public function sendLinkToFriendsForm()
    {
        $this->loadTemplate('sendLinkToFriendsForm');
    }

    public function ServiceRequestForm()
    {
        $this->loadTemplate('ServiceRequestForm');
    }

    public function Sponsorship()
    {
        $this->loadTemplate('Sponsorship');
    }

    public function TransferRXForm()
    {
        $this->loadTemplate('TransferRXForm');
    }

    public function verifyInsuranceForm()
    {
        $this->loadTemplate('verifyInsuranceForm');
    }

    public function volunteerForm()
    {
        $this->loadTemplate('volunteerForm');
    }

    public function websiteLayoutRequest()
    {
        $this->loadTemplate('websiteLayoutRequest');
    }
}