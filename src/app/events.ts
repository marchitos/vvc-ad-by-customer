export enum VvcEventType {
  // SCRIPT
  SCRIPT_LOADING_ERROR = 'script_loading_error',

  // NOTIFICATIONS
  NOTIFICATION_DISMISS = 'notification_dismiss',
  NOTIFICATION_CONFIRM = 'notification_confirm',
  NOTIFICATION_CANCEL = 'notification_cancel',

  // CHANNEL
  AGENT = 'agent',
  CONNECT = 'connect',
  CONNECTING = 'connecting',
  LOAD = 'load',
  FAILED = 'failed',
  RECONNECT = 'reconnect',
  RECONNECTING = 'reconnecting',
  DISCONNECT = 'disconnect',
  NEW = 'new',
  JOINED = 'joined',
  CLEARED = 'cleared',
  ABANDONED = 'abandoned',
  NOTICE = 'notice',
  QUEUECHANGE = 'queuechange',
  KPI = 'kpi',
  LOADCHANGE = 'loadchange',
  ASSIGNED = 'assigned',
  LEFTBYVISITOR = 'leftbyvisitor',
  LEFTBYAGENT = 'leftbyagent',

  // TRANSLATIONS
  TRANSLATION_LOADED = 'translation_loaded',
  TRANSLATED = 'translated',

  // UPLOAD
  UPLOADINPROGRESS = 'uploadinprogress',
  UPLOADSUCCESS = 'uploadsuccess',
  UPLOADFAILED = 'uploadfailed',
  UPLOADPREVIEW = 'uploadpreview',
  UPLOADCANCELED = 'uploadcanceled',

  // CONTACT
  CONTACT = 'contact',
  CONTACT_NOT_FOUND = 'contact_not_found',
  RAWMESSAGE = 'rawmessage',
  CONTACT_INFO = 'contact_info',
  LOCALCAPABILITIES = 'localcapabilities',
  CAPABILITIES = 'capabilities',
  ISWRITING = 'iswriting',
  DELIVERING = 'delivering',
  DEL_WARNING = 'del_warning',
  ACK = 'ack',
  READ = 'read',
  TEXT = 'text',
  LOCALTEXT = 'localtext',
  LOCAL_MUTE_CHANGE = 'local_mute_change',
  SYSTEM = 'system',
  MEDIAOFFER = 'mediaoffer',
  MEDIAOFFER_CONFIRM = 'mediaoffer_confirm',
  STREAM_UPDATE = 'stream_update',
  TRANSFERRED = 'transferred',
  LOCATIONCHANGE = 'locationchange',
  MEDIACHANGE = 'mediachange',
  ISIDLE = 'isidle',
  ISACTIVE = 'isactive',
  ISUNREACHABLE = 'isunreachable',
  ISLOST = 'islost',
  LEFT = 'left',
  SYNCED = 'synced',
  RECREADY = 'recready',
  RECSTARTING = 'recstarting',
  RECSTARTED = 'recstarted',
  RECSTOPPING = 'recstopping',
  OUTBOUND_CREATED = 'outbound_created',
  OUTBOUND_FAILED = 'outbound_failed',

  // CONVERSATION
  CONV_INFO = 'conv_info',
  NO_MORE_CONTACTS = 'no_more_contacts',
  PREVIOUS_TRANSCRIPT = 'previous_transcript',
  CURRENT_TRANSCRIPT = 'current_transcript',

  // TO REMOVE
  CUSTOMER_MESSAGE = 'customer_message',
  AGENT_MESSAGE = 'agent_message',
  AGENT_ATTACHMENT = 'agent_attachment',
  CUSTOMER_ATTACHMENT = 'customer_attachment',

  // INTERACTION APP ?
  TRANSLATIONS_ADD_MAP = 'translations_add_map',
  TRANSLATION_ADD = 'translation_add',
  TRANSLATIONS_UPDATED = 'translations_updated',
  TRANSLATIONS_LOADED = 'translations_loaded',
  DATA_COLLECTION = 'data_collection',
  LEAVE_CONTACT = 'leave_contact',
  TRANSLATE = 'translate',
  LOAD_LOCAL_CAPS = 'load_local_caps',
  SEND_IS_WRITING = 'send_is_writing',
  SEND_MESSAGE = 'send_message',
  GET_DATA_COLLECTION = 'get_data_collection',
  COLLECTED_DATA = 'collected_data',
  GET_CONTACT = 'get_contact',
  DISPLAY_APP = 'display_app',
  COLLECT_DATA = 'collect_data',
  CONTEXT_READY = 'context_ready',
  READY = 'ready',
  AGENT_IS_WRTING = 'agent_is_wrting',
  MESSAGE = 'message',
  QUEUE = 'queue',
  CONTACT_LEAVED = 'contact_leaved',
  CLOSE_APP = 'close_app',
  MINIMIZE_APP = 'minimize_app'
}
export interface VvcEvent {
  type: VvcEventType;
  ref?: string;
  convId?: string;
  contactId?: string;
  data?: any;
}
export enum VvcAction {
  ASSIGN = 'assign',
  ACCEPT_OFFER = 'acceptOffer',
  DECLINE_OFFER = 'declineOffer',
  ADD_LOCAL_VIDEO = 'addLocalVideo',
  REMOVE_LOCAL_VIDEO = 'removeLocalVideo',
  UNMUTE_LOCAL_AUDIO = 'unmuteLocalAudio',
  MUTE_LOCAL_AUDIO = 'muteLocalAudio',
  LOAD_CONV_INFO = 'load_conv_info',
  LOAD_TRANSCRIPT = 'load_transcript',
  LOAD_PREV_TRANSCRIPT = 'loadPreviousTranscript',
  LOAD_TRANSLATIONS = 'loadTranslations',
  SEND_READ = 'sendRead',
  SEND_IS_WRITING = 'sendIsWriting',
  SEND_MESSAGE = 'sendMessage',
  SEND_ATTACHMENT = 'sendAttachment',
  CLOSE_CONTACT = 'closeContact',
  CLOSE_CONVERSATION = 'closeConversation',
  CREATE_OUTBOUND = 'createOutbound'
}
