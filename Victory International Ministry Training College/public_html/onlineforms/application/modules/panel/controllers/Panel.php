<?php

class Panel extends MY_Controller
{

    public function __construct()
    {
    }

    public function index()
    {
        require_once(APPPATH . 'modules/email/controllers/Email.php');

        $panel = new Email();

        $data = array();
        // $data['email_list'] = $panel->getEmails();
        $this->load_page('index', $data);
    }

    public function getEmails()
    {

        $emails = raw('SELECT * FROM ' . prefix_table . ' WHERE email_type = "inbox"  ORDER BY date_sent DESC');

        $email_list = '';

        foreach ($emails as $row) :

            $mail_status = $row['status'] != 'read' ? 'unread_msg' : 'read_msg';
            $mail_active = $row['status'] == 'read' ? 'circle-inactive.png' : 'circle-active.png';
            $mail_print = $row['status'] != 'read' ? 'active-print-icon.png' : 'print-icon.png';
            $mail_trash = $row['status'] != 'read' ? 'active-trash-icon.png' : 'delete-icon.png';

            $attachment = (!empty($row['attachments'])) ? '<img class="attachment" alt="attachment" src="' . $this->fileLocation . 'attachment-icon.png" width="14" height="14"/>' : "";

            $email_list .= '
            <tr class="' . $row['status'] . ' email">
                <td class="subject">
                    <span><input class="email-checkbox" type="checkbox" checkbox-type="1" email-id="' . $row['form_id'] . '" name="email_' . $row['form_id'] . '"></span>
                    <label class="email_status" title="Mark as New" id="' . $mail_status . '" data-id="' . $row['form_id'] . '">
                        <a href="javascript:;">

                            <img class="email-circle-status" src="' . $this->fileLocation . $mail_active . '">

                        </a>
                    </label>
                    <div class="subject-inline">
                        <span>' . $row['form_from'] . '</span>
                        
                        <span>' . $attachment . ' ' . $row['form_subject'] . '</span>
                    </div>
                </td>
                <td class="table-date">
                    <span>' . $this->convertDate($row['date_sent']) . '</span>

                    <span>
                        <a href="javascript:;" class="printform" data-id="' . $row['form_id'] . '" title="Print">

                            <img class="print-icon" src="' . $this->fileLocation . $mail_print . '" alt="Print">

                        </a>
                        <a href="javascript:;" class="delete-email" data-id="' . $row['form_id'] . '" title="Delete">

                            <img class="trash-icon" src="' . $this->fileLocation . $mail_trash . '" alt="Delete">

                        </a>
                    </span>
                    
                </td>
            </tr>';

        endforeach;

        return $email_list;
    }

    public function updatePassword()
    {

        $response = array();

        $hasEmpty = false;

        $data = getrow('formdatabase_users')[0];

        foreach ($_POST as $key => $val) {
            if (empty($val)) {
                $response['message'] = '<span class="text-danger">' . ucfirst(str_replace("_", " ", $key)) . ' is empty</span>';
                $response['success'] = false;
                $hasEmpty = true;
            }
        }

        if ($hasEmpty) {
            json($response);
            die;
        }

        if ($data['user_pass'] == $_POST['current_password']) {

            if ($_POST['new_password'] == $_POST['confirm_password']) {

                $set['user_pass'] = $_POST['confirm_password'];

                $where = "user_id = '" . $_SESSION['user_id'] . "'";

                if (update('formdatabase_users', $set, $where)) {
                    $response['message'] = '<span class="text-success">Password has been changed successfully.</span>';
                    $response['success'] = true;
                } else {
                    $response['message'] = '<span class="text-warning">Fail to update password</span>';
                    $response['success'] = true;
                }
            } else {
                $response['message'] = '<span class="text-warning">New password and confirm password do not match</span>';
                $response['success'] = false;
            }
        } else {
            $response['message'] = '<span class="text-danger">Current password is incorrect</span>';
            $response['success'] = false;
        }

        json($response);
    }
}
