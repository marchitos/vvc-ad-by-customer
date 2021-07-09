import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {VvcAction, VvcEvent, VvcEventType} from './events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('adCore', {static: true}) adCore: ElementRef;

  txl8Map = [
    {
      id: 'AD.ISWRITING',
      values: {
        it: { value: '{{user}} sta scrivendo', state: 'final' },
        en: { value: '{{user}} is writing...', state: 'final' } } },
    {
      id: 'AD.SEND_PH',
      values: {
        it: { value: 'scrivi qui...', state: 'final' },
        en: { value: 'type message here...', state: 'final' } } },
    {
      id: 'AD.SEND_ATTACHMENT_PH',
      values: {
        it: { value: 'aggiungi una descrizione e invia...', state: 'final' },
        en: { value: 'add description and send...', state: 'final' } } },
    {
      id: 'AD.UPLOAD_ERROR',
      values: {
        it: { value: ' - dimensione massima {{filesize}}', state: 'final' },
        en: { value: ' - file size exceeded {{filesize}}', state: 'final' } } },
    {
      id: 'AD.LEFT_BY_CUSTOMER',
      values: {
        it: { value: 'Chat chiusa dal cliente', state: 'final' },
        en: { value: 'The customer close the chat', state: 'final' } } },
    {
      id: 'AD.CHAT_NEW_MESSAGE',
      values: {
        it: { value: 'nuovo messaggio', state: 'final' },
        en: { value: 'new message', state: 'final' } } },
    {
      id: 'AD.INCOMING_CALL',
      values: {
        it: { value: 'Chiamata in arrivo da', state: 'final' },
        en: { value: 'Incoming call from', state: 'final' } } },
    {
      id: 'TODAY',
      values: {
        it: { value: 'Oggi', state: 'final' },
        en: { value: 'Today', state: 'final' } } },
    {
      id: 'AD.CALENDAR.WEEK_DAYS',
      values: {
        it: { value: 'Lunedì,Martedì,Mercoledì,Giovedì,Venerdì,Sabato,Domenica', state: 'final' },
        en: { value: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday', state: 'final' } } },
    {
      id: 'YESTERDAY',
      values: {
        it: { value: 'Ieri', state: 'final' },
        en: { value: 'Yesterday', state: 'final' } } },
    {
      id: 'AD.CALENDAR.LAST_WEEK',
      values: {
        it: { value: 'dddd', state: 'final' },
        en: { value: '[Last Week]', state: 'final' } } },
    {
      id: 'AD.CALENDAR.OTHER',
      values: {
        it: { value: 'L', state: 'final' },
        en: { value: 'L', state: 'final' } } },
    {
      id: 'AD.CALENDAR.DATE_FORMAT',
      values: {
        it: { value: 'DD/MM/YYYY', state: 'final' },
        en: { value: 'MM/DD/YYYY', state: 'final' } } },
    {
      id: 'AD.MEDIA.ACCEPT_VIDEO',
      values: {
        it: { value: 'Video', state: 'final' },
        en: { value: 'Video', state: 'final' } } },
    {
      id: 'AD.MEDIA.ACCEPT_AUDIO',
      values: {
        it: { value: 'Audio', state: 'final' },
        en: { value: 'Audio', state: 'final' } } },
    {
      id: 'AD.MEDIA.ACCEPT_AUDIO_ONLY',
      values: {
        it: { value: 'Solo Audio', state: 'final' },
        en: { value: 'Audio Only', state: 'final' } } },
    {
      id: 'AD.MEDIA.DECLINE_OFFER',
      values: {
        it: { value: 'Rifiuta', state: 'final' },
        en: { value: 'Decline', state: 'final' } } },
    { id: 'CUSTOM.INCOMING_REQUEST',
      values: {
        it: { value: 'Richiesta in arrivo...', state: 'final'},
        en: { value: 'Incoming request...', state: 'final' } } },
    { id: 'AD.MEDIA.MORE_MENU.AUDIO_INPUT',
      values: {
        it: { value: 'Microfoni', state: 'final'},
        en: { value: 'Microphones', state: 'final' } } },
    { id: 'AD.MEDIA.MORE_MENU.AUDIO_OUTPUT',
      values: {
        it: { value: 'Casse', state: 'final'},
        en: { value: 'Speakers', state: 'final' } } },
    { id: 'AD.MEDIA.MORE_MENU.VIDEO_INPUT',
      values: {
        it: { value: 'Webcam', state: 'final'},
        en: { value: 'Webcam', state: 'final' } } },
    { id: 'AD.MEDIA.PANEL.AUDIO_INPUT',
      values: {
        it: { value: 'Microfono', state: 'final'},
        en: { value: 'Microphone', state: 'final' } } },
    { id: 'AD.MEDIA.PANEL.AUDIO_OUTPUT',
      values: {
        it: { value: 'Dispositivo di uscita', state: 'final'},
        en: { value: 'Output device', state: 'final' } } },
    { id: 'AD.MEDIA.PANEL.VIDEO_INPUT',
      values: {
        it: { value: 'Camera', state: 'final'},
        en: { value: 'Camera', state: 'final' } } },
    { id: 'AD.MEDIA.MODAL_PANEL.TITLE',
      values: {
        it: { value: 'Impostazioni', state: 'final'},
        en: { value: 'Settings', state: 'final' } } },
    { id: 'AD.MEDIA.MODAL_PANEL.AUDIO.TITLE',
      values: {
        it: { value: 'Voce', state: 'final'},
        en: { value: 'Voice', state: 'final' } } },
    { id: 'AD.MEDIA.MODAL_PANEL.VIDEO.TITLE',
      values: {
        it: { value: 'Video', state: 'final'},
        en: { value: 'Video', state: 'final' } } },
    ];

  private core;

  // -------- APP STATE ----------
  agent: any;
  outboundOptions = {
    campaignId: '60cc716cf54881663da9ec77',
    entryPointId: '1624010966487',
    channelId: 'web',
    mediaPreset: 'chat',
    // scriptId: '5f58df611e8f5ca36d5ab666'
  };
  customerIds = [];
  customersInfo: { [customerId: string]: { nickname: string, pending: boolean, [other: string]: any }} = {};
  customerByContact: { [contactId: string]: string} = {};
  contactByCustomer: { [customerId: string]: string} = {};
  mediaByContact: { [contactId: string]: { hasVideo?: boolean } } = {};
  lastMessageByCustomer: { [customerId: string]: { message?: string, isNew?: boolean, ts?: Date } } = {};
  lastMediaOffer: any = {};
  videoOfferUpgrade: any = {
    Voice: {tx: 'required', rx: 'required', via: 'net', engine: 'WebRTC'},
    Video: {tx: 'optional', rx: 'optional', via: 'net', engine: 'WebRTC'}
  };
  isVideoFullScreen = false;
  onIncomingOffer = false;
  selectedCustomerId;
  showContactBar = false;
  loadedCustomer: {
    customerId?: string;
    nickname?: string;
    contactId?: string;
    convId?: string;
    //order previousConvIds by newest conversations
    previousConvIds?: string[],
    customerToken?: string
  } = {};

  isNewMessage(customerId) {
    return this.lastMessageByCustomer[customerId] && this.lastMessageByCustomer[customerId].isNew;
  }
  hasNotifications() {
    const newStaff = Object.values(this.lastMessageByCustomer).filter( item => item.isNew);
    return newStaff.length > 0;
  }
  hasVideo(contactId) {
    if (!contactId) { return false; }
    return this.mediaByContact[contactId] && this.mediaByContact[contactId].hasVideo;
  }
  setFullScreen(evt, fullscreen) {
    this.isVideoFullScreen = fullscreen;
    console.log('setting full screen', evt, fullscreen, this.isVideoFullScreen);
  }
  unsetFullScreen(evt, fullscreen) {
    this.isVideoFullScreen = fullscreen;
    console.log('unsetting full screen', evt, fullscreen, this.isVideoFullScreen);
  }
  getLoadedCustomer(customerId) {
    const customer = this.customersInfo[customerId];
    const nickname = customer.nickname;
    const convId = customer.convId;
    const previousConvIds = customer.previousConvIds || []
    const customerToken = customer.customerToken;
    return {
      nickname,
      convId,
      previousConvIds,
      customerId,
      customerToken,
      contactId: this.contactByCustomer[customerId],
    };
  }
  handleVivochaEvents(evt: VvcEvent) {
    switch (evt.type) {
      case VvcEventType.READY: {
        this.init();
        break;
      }
      case VvcEventType.NEW: {
        const contact = evt.data.contact;
        const customer = evt.data.customer;
        const customerId = customer.ext_id;
        if (!this.customersInfo[customerId]) { this.customerIds = [customerId, ...this.customerIds]; }
        this.customersInfo[customerId] = { ...customer, convId: contact.contact.conv_id, pending: true };
        this.customerByContact[contact.id] = customerId;
        this.contactByCustomer[customerId] = contact.id;
        if (!this.lastMessageByCustomer[customerId]) { this.lastMessageByCustomer[customerId] = {}; }
        this.lastMessageByCustomer[customerId] = { isNew: true, ts: contact.contact.ts };
        break;
      }
      case VvcEventType.AGENT: {
        this.agent = { ...evt.data };
        break;
      }
      case VvcEventType.ASSIGNED: {
        const contactId = evt.contactId;
        const customerId = this.customerByContact[contactId];
        if (this.customersInfo[customerId] && this.customersInfo[customerId].pending) {
          this.customersInfo = {
            ...this.customersInfo,
            [customerId]: {...this.customersInfo[customerId], pending: false}
          };
          this.loadedCustomer = this.getLoadedCustomer(customerId);
          this.selectedCustomerId = customerId;
        }
        break;
      }
      case VvcEventType.TEXT: {
        const contactId = evt.contactId;
        const customerId = this.customerByContact[contactId];
        const message = evt.data;
        this.lastMessageByCustomer[customerId] = {
          ...this.lastMessageByCustomer[customerId],
          isNew: this.selectedCustomerId !== customerId,
          message: message.body,
          ts: message.createdAt
        };
        break;
      }
      case VvcEventType.MEDIAOFFER_CONFIRM: {
        this.onIncomingOffer = true;
        this.lastMediaOffer = {...evt.data};
        this.loadedCustomer = this.getLoadedCustomer(this.customerByContact[evt.contactId]);
        this.selectedCustomerId = this.customerByContact[evt.contactId];
        break;
      }
      case VvcEventType.MEDIACHANGE: {
        this.onIncomingOffer = false;
        if (!this.mediaByContact[evt.contactId]) {
          this.mediaByContact[evt.contactId] = {};
        }
        const mediaChange = evt.data;
        if (mediaChange.Video && (mediaChange.Video.tx || mediaChange.Video.rx)) {
          this.mediaByContact[evt.contactId] = {...this.mediaByContact[evt.contactId], hasVideo: true };
        } else {
          this.mediaByContact[evt.contactId] = {...this.mediaByContact[evt.contactId], hasVideo: false };
        }
        break;
      }
    }
  }

  acceptOffer(offer, customerId, contactId) {
    this.core.action({ type: VvcAction.ACCEPT_OFFER, contactId, data: offer });
  }
  declineOffer(offer, customerId, contactId) {
    this.core.action({ type: VvcAction.DECLINE_OFFER, contactId });
    this.onIncomingOffer = false;
  }
  showList() {
    this.selectedCustomerId = undefined;
  }
  showDetail(customerId) {
    const customer = this.customersInfo[customerId];
    const contactId = this.contactByCustomer[customerId];
    if (customer.pending) {
      this.core.action({ type: 'assign', data: contactId });
    }
    this.selectedCustomerId = customerId;
    this.loadedCustomer = this.getLoadedCustomer(customerId);
    this.lastMessageByCustomer[customerId] = { ...this.lastMessageByCustomer[customerId], isNew: false };
  }
  contactIdChange(evt, customerId) {
    const contactId = evt.detail;
    this.customersInfo[customerId].contactId = contactId;
    delete this.contactByCustomer[customerId];
    this.contactByCustomer = {...this.contactByCustomer, [customerId]: contactId}
    delete this.customerByContact[contactId];
    this.customerByContact = {...this.customerByContact, [contactId]: customerId}
    this.loadedCustomer = {...this.loadedCustomer, contactId: contactId}
  }
  vivochaEvent(evt) {
    this.handleVivochaEvents(evt.detail);
  }
  async fetchCustomers() {
    const getRes = await fetch('/assets/customers.json');
    const customers = await getRes.json();

    const customerIds = customers.sort((a, b) => {
      return new Date(b.lastMessageTs).getTime() - new Date(a.lastMessageTs).getTime();
    }).map( c => {
      this.customersInfo[c.customerId] = { ...c };
      this.lastMessageByCustomer[c.customerId] = { ts: c.lastMessageTs, message: c.lastMessage };
      return c.customerId;
    });
    this.customerIds = [...customerIds];
  }
  async init() {
    const urlParams = new URLSearchParams(window.location.search);
    const world = urlParams.get('world');
    const acct = urlParams.get('acct');
    const jwt = urlParams.get('jwt');
    if (world && acct && jwt) {
      this.core = await this.adCore.nativeElement.init({ world, acct, jwt });
      this.core.action({
        type: 'loadTranslations',
        data: {
          langMap: this.txl8Map,
          useLang: 'en',
          defaultLang: 'en'
        }
      });
    } else {
      alert('Configuration params missing, be sure to set world, acct, jwt in query string');
    }
  }
  async ngOnInit() {
    await this.fetchCustomers();
  }

}
