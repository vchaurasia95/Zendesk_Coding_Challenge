import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TicketService } from './ticket.service';
import { environment } from '../../environments/environment';

describe('TicketService', () => {
  let service: TicketService;
  let httpController: HttpTestingController;
  const mockTicketData = {
    "tickets": [
      {
        "url": "https://zccticket-viewer-vishal-ub.zendesk.com/api/v2/tickets/101.json",
        "id": 101,
        "external_id": null,
        "via": {
          "channel": "api",
          "source": {
            "from": {},
            "to": {},
            "rel": null
          }
        },
        "created_at": "2021-11-23T03:37:19Z",
        "updated_at": "2021-11-23T03:37:19Z",
        "type": null,
        "subject": "in nostrud occaecat consectetur aliquip",
        "raw_subject": "in nostrud occaecat consectetur aliquip",
        "description": "Esse esse quis ut esse nisi tempor sunt. Proident officia incididunt cupidatat laborum ipsum duis. Labore qui labore elit consequat.\n\nDo id nisi qui et fugiat culpa veniam consequat ad amet ut nisi ipsum. Culpa exercitation consectetur adipisicing sunt reprehenderit. Deserunt consequat aliquip tempor anim officia elit proident commodo consequat aute. Magna enim esse tempor incididunt ipsum dolore Lorem cupidatat incididunt.",
        "priority": null,
        "status": "open",
        "recipient": null,
        "requester_id": 1524015095461,
        "submitter_id": 1524015095461,
        "assignee_id": 1524015095461,
        "organization_id": 1500632199101,
        "group_id": 1500006596041,
        "collaborator_ids": [],
        "follower_ids": [],
        "email_cc_ids": [],
        "forum_topic_id": null,
        "problem_id": null,
        "has_incidents": false,
        "is_public": true,
        "due_at": null,
        "tags": [
          "deserunt",
          "enim",
          "est"
        ],
        "custom_fields": [],
        "satisfaction_rating": null,
        "sharing_agreement_ids": [],
        "fields": [],
        "followup_ids": [],
        "ticket_form_id": 1500003293261,
        "brand_id": 1500002336601,
        "allow_channelback": false,
        "allow_attachments": true
      }
    ],
    "next_page": null,
    "previous_page": "https://zccticket-viewer-vishal-ub.zendesk.com/api/v2/tickets.json?page=1",
    "count": 101
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TicketService]
    });
    service = TestBed.inject(TicketService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get Tickets', () => {
    service.getTickets('2').subscribe((resp) => {
      expect(resp).toEqual(mockTicketData);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: environment['apiBase'] + "/tickets/2"
    });
    req.flush(mockTicketData);
  });
});
