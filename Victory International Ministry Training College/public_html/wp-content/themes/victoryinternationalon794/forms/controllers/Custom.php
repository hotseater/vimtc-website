<?php
defined('ACCESSIBLE') or exit('No direct script access allowed');
require_once 'core/Controller.php';
class Custom extends Controller
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

    public function loadCustom($form)
    {
        $data['input'] = new Controller();
        if(!file_exists('./views/customs/' . $form . '.php')){
            return $this->index();
        }
        $this->load->custom($form, $data);
    }

    public function index(){
        $this->loadCustom('index');
    }

    /* Function Insert Location */

    /* Function Truncate Location */

    public function SampleCareers()
    {
        $this->loadCustom('SampleCareers');
    }

    /* Function Truncate Location */

    public function patientForm()
    {
        $this->loadCustom('patientForm');
    }

    /* Function Truncate Location */

    public function RoseFormNew()
    {
        $this->loadCustom('RoseFormNew');
    }

    /* Function Truncate Location */

    public function ApplicationForm()
    {
        $this->loadCustom('ApplicationForm');
    }

    /* Function Truncate Location */

    public function PartnerwithTrust()
    {
        $this->loadCustom('PartnerwithTrust');
    }

    /* Function Truncate Location */

    public function StepsToJoinForm()
    {
        $this->loadCustom('StepsToJoinForm');
    }

    /* Function Truncate Location */

    public function EmployeeRetentionTaxCredit()
    {
        $this->loadCustom('EmployeeRetentionTaxCredit');
    }

    /* Function Truncate Location */

    public function EmploymentV3()
    {
        $this->loadCustom('EmploymentV3');
    }

    /* Function Truncate Location */

    public function ExchangeRequestForm()
    {
        $this->loadCustom('ExchangeRequestForm');
    }

    /* Function Truncate Location */

    public function SampleConverted()
    {
        $this->loadCustom('SampleConverted');
    }

    /* Function Truncate Location */

    public function Sample_Conversion()
    {
        $this->loadCustom('Sample_Conversion');
    }

    /* Function Truncate Location */

    public function PatientInformationForm()
    {
        $this->loadCustom('PatientInformationForm');
    }

    /* Function Truncate Location */

    public function ScholarshipGrants()
    {
        $this->loadCustom('ScholarshipGrants');
    }

    /* Function Truncate Location */

    public function AdmissionFormFund()
    {
        $this->loadCustom('AdmissionFormFund');
    }

    /* Function Truncate Location */

    public function FreeConsult()
    {
        $this->loadCustom('FreeConsult');
    }

    /* Function Truncate Location */

    public function PatientTransferSignUpForm()
    {
        $this->loadCustom('PatientTransferSignUpForm');
    }

    /* Function Truncate Location */

    public function IncidentReportForm()
    {
        $this->loadCustom('IncidentReportForm');
    }

    public function applyNowForm()
    {
        $this->loadCustom('applyNowForm');
    }


    /* Function Truncate Location */

    public function BookACandidateForm()
    {
        $this->loadCustom('BookACandidateForm');
    }

    /* Function Truncate Location */
  
}