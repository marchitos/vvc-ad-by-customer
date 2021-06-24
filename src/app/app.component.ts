import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {VvcEvent, VvcEventType} from './events';

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
        en: { value: 'Incoming request...', state: 'final' } } }
    ];

  private core;

  // -------- APP STATE ----------
  agent: any;
  outboundOptions = {
    campaignId: '5e42e1c37848385687cd34ba',
    entryPointId: '1581441464653',
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
    const customerToken = customer.customerToken;
    return {
      nickname,
      convId,
      customerId,
      customerToken,
      contactId: this.contactByCustomer[customerId],
    };
  }
  handleVivochaEvents(evt: VvcEvent) {
    console.log('UPDATE-EVT', evt);
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
        this.customersInfo = {...this.customersInfo, [customerId]: {...this.customersInfo[customerId], pending: false}};
        this.loadedCustomer = this.getLoadedCustomer(customerId);
        this.selectedCustomerId = customerId;
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
    this.core.action({ type: 'acceptOffer', contactId, data: offer });
  }
  declineOffer(offer, customerId, contactId) {
    this.core.action({ type: 'declineOffer', contactId });
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
          useLang: 'it',
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
  /*
      agent;
      customers = {};
      outboundOptions = {
        campaignId: '5efde21b5914b35cebce9a59',
        channelId: 'web',
        mediaPreset: 'chat',
        entryPointId: '1593696757736',
        // scriptId: '5f58df611e8f5ca36d5ab666'
      };

      contactByCustomer = {};
      customerMap: { [extId: string]: any} = {};
      customerSelected;

      sidebarOpened = false;
      slideValue = 0;
      contactId;
      contact;
      mediaOffer;
      assigned = false;
      showUpgradeOffer = false;
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
          id: 'AD.CALENDAR.TODAY',
          values: {
            it: { value: '[Oggi]', state: 'final' },
            en: { value: '[Today]', state: 'final' } } },
        {
          id: 'AD.CALENDAR.WEEK_DAYS',
          values: {
            it: { value: 'Lunedì,Martedì,Mercoledì,Giovedì,Venerdì,Sabato,Domenica', state: 'final' },
            en: { value: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday', state: 'final' } } },
        {
          id: 'AD.CALENDAR.YESTERDAY',
          values: {
            it: { value: '[Ieri]', state: 'final' },
            en: { value: '[Yesterday]', state: 'final' } } },
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
            en: { value: 'MM/DD/YYYY', state: 'final' } } }

      ];
      count = 0;
      ngOnInit(): void {
        setTimeout( () => {
          this.count = 1;
          console.log(this.count);
        }, 1000);
    *
        setTimeout( () => {
          this.count = 2;
          console.log(this.count);
        }, 1000);*
      }

      needAgentConfirm(offer) {
        console.log('needAgentToConfirm', !!((offer.Video && offer.Video.tx !== 'off') || (offer.Voice && offer.Voice.tx !== 'off')), offer);
        return !!((offer.Video && offer.Video.tx !== 'off') || (offer.Voice && offer.Voice.tx !== 'off'));
      }
      vvcContactEvent(evt) {
        // console.log('vvcContactsEvents', evt.detail.type, evt.detail.data);
        const ev = evt.detail;
        switch (ev.type) {
          case 'mediaoffer_confirm':
            this.mediaOffer = ev.data;
            this.showUpgradeOffer = true;
            break;
          case 'mediachange':
            this.showUpgradeOffer = false;
            break;
        }
      }
      loadCustomerMap() {
        this.customerMap = {
          cristianoid: {
            pending: false,
            convId: null,
            contactId: null,
            previousConvIds: [

            ],
            // tslint:disable-next-line:max-line-length
            customerToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyaXN0aWFub2lkIiwiYWNjdF9pZCI6Im1hcmNoaXRvcyIsIm5pY2tuYW1lIjoiY3Jpc3RpYW5vIiwiZXh0cmEiOnsicm0iOiJtYXJjaGl0b3MifX0.Dqq_Muo3Nzkbm2Tgy9EhqO7T66uZ-zZB8Kn24HbX-8k',
            // tslint:disable-next-line:max-line-length
            _customerToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyaXN0aWFub2lkIiwiYWNjdF9pZCI6Im1hcmNoaXRvcyJ9.7IOSTV0urneZX4Vc7w1t8XlHLtSSxDqrMR21ZL-kH90',
            vvcu: '20200615ONt7ZQxPIBXXE4N2'
          },
          gonzaloid: {
            pending: false,
            convId: null,
            contactId: null,
            previousConvIds: []
          }
        };
      }
      getCustomers() {
        return Object.keys(this.customerMap);
      }
      selectCustomer(c) {
        console.log('CUSTOMER SELECTED', c);
        this.customerSelected = null;
        setTimeout( () => {
          this.customerSelected = c;
        }, 200);

      }

       * Listen for Vivocha channel events
       * @param evt channel event

      vivochaEvent(evt) {
        switch (evt.detail.type) {
          case 'load':
            this.adCore.nativeElement.setTranslationsMap(this.txl8Map, 'it', 'en');
            this.loadCustomerMap();
            *
            this.adCore.nativeElement.sendEvent({
              type: 'loadTranslations',
              data: {
                langMap: this.txl8Map,
                useLang: 'it',
                defaultLang: 'en'
              }
            });
            *

            break;

           * The new event comes from channel when
           * a pending contact is present for the agent

          case 'new': {
            const contact = evt.detail.data.contact;
            const customer = evt.detail.data.customer;
            this.customers[customer.ext_id] = {...customer};
            console.log('CUSTOMER', customer);
            this.addPendingContact(contact);
            break;
          }

           * The assigned event comes when the contact
           * have been assigned to the current agent

          case 'assigned': {
            const contactId = evt.detail.contactId;
            const custId = this.

            [contactId];
            this.customerMap[custId].pending = false;
            this.customerSelected = custId;
            break;
          }
          case 'agent':
            this.agent = {...evt.detail.data };
            break;

           * The cleared event arrive when the user left
           * the contact before the agent join the contact

          case 'cleared': {
            const contact = evt.detail.data;
            // this.clearContact(contact.id);
            break;
          }
          case 'leftByVisitor': {
            const contactId = evt.detail.data;
            // this.clearContact(contactId);
            console.log('LEFT BY VISITOR');
            break;
          }
          case 'mediaoffer_confirm': {
            console.log('CONFIRM?', evt.detail);
            const contactId = evt.detail.contactId;
            const custId = this.contactByCustomer[contactId];
            this.customerMap[custId] = {
              ...this.customerMap[custId],
              onOffer: true,
              lastOffer: evt.detail.data
            };
            console.log('currentCustomerMap', this.customerMap[custId]);
            break;
          }
          default:
            console.log('vvcEvents', evt.detail.type, evt.detail);
            break;
        }
      }

      addPendingContact(contact) {
        const cust = contact.contact.cust;
        if (!this.customerMap[cust.ext_id]) { this.customerMap[cust.ext_id] = {}; }
        this.customerMap[cust.ext_id] = {
          ...this.customerMap[cust.ext_id],
          convId: contact.contact.conv_id,
          contactId: contact.id,
          pending: true
        };
        // this.customerSelected = cust.ext_id;
        // console.log('PENDING CONTACT', this.customerMap[cust.ext_id]);
        // this.contactId = contact.id;
        // this.contact = contact;
      }
      contactIdChange(evt, customerId) {
        const contactId = evt.detail;
        console.log('new contact id for customer', contactId, customerId);
        this.customerMap[customerId].contactId = contactId;
      }
      closeContact() {
        const customer = this.customerMap[this.customerSelected];
        if (customer && customer.contactId) {
          this.adCore.nativeElement.sendEvent({ type: 'closeContact', data: customer.contactId });
        }
      }
      closeConversation() {
        const customer = this.customerMap[this.customerSelected];
        if (customer && customer.contactId) {
          this.adCore.nativeElement.sendEvent({ type: 'closeConversation', data: customer.contactId });
        }
      }
      trackByCustomerId(index: number, elem: string) {
        return elem;
      }

       * Raise the event that ask to the channel to assign to the
       * current agent the contact with the passed contactId

      assignContact() {
        this.adCore.nativeElement.sendEvent({ type: 'assign', data: this.contactId });
      }

      clearContact(contactId) {
        if (this.contactId === contactId) {
          this.contactId = null;
          this.contact = null;
          this.assigned = false;
        }
      }

      changeLang() {
        this.adCore.nativeElement.sendEvent({ type: 'changeLang', data: 'en'});
      }

      setSlideValue(ev) {
        console.log('vvcChange', ev);
        this.slideValue = ev.detail.value;
      }
      moveSlider(slider, val) {
        slider.value = val;
      }

      toggleSidebar() {
        this.sidebarOpened = !this.sidebarOpened;
        this.layoutElem.nativeElement.toggleSidebar();
      }

      sendMessage(evt) {
        console.log(evt, evt.detail.data);
      }
      textChange(evt) {
        console.log(evt, evt.detail);
      }
      assign(customerId) {
        const contactId = this.customerMap[customerId].contactId;
        this.contactByCustomer[this.customerMap[customerId].contactId] = customerId;
        this.adCore.nativeElement.sendEvent({ type: 'assign', data: contactId });
      }
      acceptOffer(offer, customerId) {
        console.log('should accept offer', offer, customerId);
        this.adCore.nativeElement.sendEvent({ type: 'acceptOffer', contactId: this.customerMap[customerId].contactId, data: offer });
        this.customerMap[customerId] = {...this.customerMap[customerId], onOffer: false};
      }
      declineOffer(offer, customerId) {
        console.log('should decline offer', offer, customerId);
        this.adCore.nativeElement.sendEvent({ type: 'declineOffer', contactId: this.customerMap[customerId].contactId });
        this.customerMap[customerId] = {...this.customerMap[customerId], onOffer: false};
      }
      createOutbound() {
        const createContactOptions = this.outboundOptions;
        this.adCore.nativeElement.sendEvent({ type: 'createOutbound', data: createContactOptions });
      }
      mute() {
        const customer = this.customerMap[this.customerSelected];
        if (customer && customer.contactId) {
          this.adCore.nativeElement.sendEvent({ type: 'muteLocalAudio', contactId: customer.contactId });
        }
      }
      unmute() {
        const customer = this.customerMap[this.customerSelected];
        if (customer && customer.contactId) {
          this.adCore.nativeElement.sendEvent({ type: 'unmuteLocalAudio', contactId: customer.contactId });
        }
      }
      addLocalVideo() {
        const customer = this.customerMap[this.customerSelected];
        if (customer && customer.contactId) {
          this.adCore.nativeElement.sendEvent({ type: 'addLocalVideo', contactId: customer.contactId });
        }
      }
      removeLocalVideo() {
        const customer = this.customerMap[this.customerSelected];
        if (customer && customer.contactId) {
          this.adCore.nativeElement.sendEvent({ type: 'removeLocalVideo', contactId: customer.contactId });
        }
      }
      upgradeToVideo() {
        const customer = this.customerMap[this.customerSelected];
        console.log('going to upgrade video', customer, customer.contactId);
        if (customer && customer.contactId) {
          const payload = {
            Voice: {tx: 'required', rx: 'required', via: 'net', engine: 'WebRTC'},
            Video: {tx: 'optional', rx: 'optional', via: 'net', engine: 'WebRTC'}
          };
          this.adCore.nativeElement.sendEvent({ type: 'upgradeMedia', contactId: customer.contactId, data: payload});
        }
      }
      downgradeVideo() {
        const customer = this.customerMap[this.customerSelected];
        console.log('going to downgrade video', customer, customer.contactId);
        if (customer && customer.contactId) {
          const payload = {
            Voice: {tx: 'off', rx: 'off', via: 'net', engine: 'WebRTC'},
            Video: {tx: 'off', rx: 'off', via: 'net', engine: 'WebRTC'}
          };
          this.adCore.nativeElement.sendEvent({ type: 'downgradeMedia', contactId: customer.contactId, data: payload});
        }
      }*/

}
