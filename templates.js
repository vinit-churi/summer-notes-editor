export const template1 = `<table style="width:100%;border-bottom:1px solid #000000;">  <tbody><tr>    <td style="width:100px;">      [Company_Logo]    </td>    <td style="text-align:right;">      <table style="width:100%;">          <tbody><tr style="text-align:right;">            <td style="font-size:1.5rem;">[Company_Name]</td>          </tr>          <tr style="text-align:right;">            <td style="display:inline-block;width:400px;">[Company_Address]</td>          </tr>      </tbody></table>    </td>  </tr></tbody></table><p><br></p><div style="text-align:right;">[Current_Date]</div><p><br></p><div style="text-align:center;"><strong>Relieving letter</strong></div><p>Dear [Employee_Name],<br><br>With reference to your resignation email dated [Employee_Resignation_Date], you are hereby relieved from your duties as on <strong>[Employee_Relieving_Date]</strong>. We confirm that you have been working with [Company_Name], as [Employee_Designation] from [Employee_Joining_Date] to [Employee_Relieving_Date].<br><br>We would like to thank you for your service with [Company_Name] &amp; wish you the best in your future endeavours.<br><br>For <strong>[Company_Name]</strong><br><br><br><strong>[HR_Name]</strong><br><strong>[HR_Designation]</strong></p>`;

export const createInitTemplate = `<table style="width: 100%; border-bottom: 1px solid black">
<tbody><tr>
  <td style="width: 100px;">
    [Company_Logo]
  </td>
  <td style="text-align: right;">
    <table style="width: 100%">
        <tbody><tr style="text-align: right;">
          <td style="font-size: 1.5rem" "="">[Company_Name]</td>
        </tr>
        <tr style="text-align: right;">
          <td style="display:inline-block;width:400px">[Company_Address]</td>
        </tr>
    </tbody></table>
  </td>
</tr>
</tbody></table>
<p><br>
Please enter your letter content here</p>`;
