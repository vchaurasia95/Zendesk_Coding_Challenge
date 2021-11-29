import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TicketDialogComponent } from './ticket-dialog.component';

describe('TicketDialogComponent', () => {
  let component: TicketDialogComponent;
  let fixture: ComponentFixture<TicketDialogComponent>;
  const mockData = {
    "url": "https://zccticket-viewer-vishal-ub.zendesk.com/api/v2/tickets/1.json",
    "id": 1,
    "external_id": null,
    "via": {
      "channel": "sample_ticket",
      "source": {
        "from": {},
        "to": {},
        "rel": null
      }
    },
    "created_at": "2021-11-23T03:13:59Z",
    "updated_at": "2021-11-23T03:14:00Z",
    "type": "incident",
    "subject": "Sample ticket: Meet the ticket",
    "raw_subject": "Sample ticket: Meet the ticket",
    "description": "Hi there,\n\nI’m sending an email because I’m having a problem setting up your new product. Can you help me troubleshoot?\n\nThanks,\n The Customer\n\n",
    "priority": "normal",
    "status": "open",
    "recipient": null,
    "requester_id": 1524015112821,
    "submitter_id": 1524015095461,
    "assignee_id": 1524015095461,
    "organization_id": null,
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
      "sample",
      "support",
      "zendesk"
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
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketDialogComponent],
      providers: [{
        provide: MAT_DIALOG_DATA, useValue: mockData
      },
      { provide: MatDialogRef, useValue: {} }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
