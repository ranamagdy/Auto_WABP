import TemplatePage from '../Pages/TemplatePage';
import BasePage from '../Pages/BasePage';

describe('Template Page Tests Using Fixtures', () => {
   BasePage.init(TemplatePage, 'TemplateData');
   it ('Should open Template page', () => {
    TemplatePage.assertPageNavigation('templates');  // dynamically asserts URL
   });
    it.only('Should create template with no header , no variables ,no footer , no buttons', function () {
        TemplatePage.NoHederTemplate(this.TemplateData.TemplateName,this.TemplateData.Category[0],this.TemplateData.Channel,this.TemplateData.Type,this.TemplateData.Body);
    });
    it('Should create template with text header , 1 variables ,with footer and 1 buttons (mobile number variable )', function () {
        TemplatePage.TxtHederTemplate(this.TemplateData.Name,this.TemplateData.Language,this.TemplateData.Availability,this.TemplateData.Category,this.TemplateData.Channel,this.TemplateData.Type,this.TemplateData.footer,this.TemplateData.Body);
    });
    it('Should create template with image header , 2 variables ,with footer and 2 buttons. (URL variable , mobile number variable)', function () {
        TemplatePage.ImageHederTemplate(this.TemplateData.Name,this.TemplateData.Language,this.TemplateData.Availability,this.TemplateData.Category,this.TemplateData.Channel,this.TemplateData.Type,this.TemplateData.footer,this.TemplateData.Body);
    });
    it('Should create template with video header , 3 variables, with footer and2 buttons. (URL variable , mobile number variable)', function () {
        TemplatePage.VideoHederTemplate(this.TemplateData.Name,this.TemplateData.Language,this.TemplateData.Availability,this.TemplateData.Category,this.TemplateData.Channel,this.TemplateData.Type,this.TemplateData.footer,this.TemplateData.Body);
    });
    it('Should create template with document header , 4 variables ,with footerand 2 buttons. (URL variable , mobile number variable)', function () {
        TemplatePage.DocumentHederTemplate(this.TemplateData.Name,this.TemplateData.Language,this.TemplateData.Availability,this.TemplateData.Category,this.TemplateData.Channel,this.TemplateData.Type,this.TemplateData.footer,this.TemplateData.Body);
    });
    it('Should create template with location header , 5 variables ,with footer and 2 buttons. (URL variable , mobile number variable)', function () {
        TemplatePage.LocationHederTemplate(this.TemplateData.Name,this.TemplateData.Language,this.TemplateData.Availability,this.TemplateData.Category,this.TemplateData.Channel,this.TemplateData.Type,this.TemplateData.footer,this.TemplateData.Body);
    });
    it('Should search for template by title', function () {
        TemplatePage.SearchForTemplateTitle(this.TemplateData.Name);
    });
    it('Should search for template by language', function () {
        TemplatePage.SearchForTemplateLanguage(this.TemplateData.Language);
    }); 
    it('Should search for template by availability', function () {
        TemplatePage.SearchforAvailablity(this.TemplateData.Availability);
    });
    it('Should search for template by status', function () {
        TemplatePage.SearchforStatus(this.TemplateData.Status);
    });
    it('Should search for template by channel', function () {
        TemplatePage.SearchforChannel(this.TemplateData.Channel);
    });     
  });