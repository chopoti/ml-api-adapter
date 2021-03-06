/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 - Shashikant Hirugade <shashikant.hirugade@modusbox.com>
--------------
 ******/

'use strict'

const Config = require('./config')
const Mustache = require('mustache')
const KafkaConfig = Config.KAFKA_CONFIG
const Logger = require('@mojaloop/central-services-shared').Logger

/**
 * @module src/lib/utility
 */

/**
 * The Producer config required
 *
 * This ENUM is for the PRODUCER of the topic being created
 *
 * @typedef {object} ENUMS~PRODUCER
 * @property {string} PRODUCER - PRODUCER config to be fetched
 */
const PRODUCER = 'PRODUCER'
/**
 * The Consumer config required
 *
 * This ENUM is for the CONSUMER of the topic being created
 *
 * @typedef {object} ENUMS~CONSUMER
 * @property {string} CONSUMER - CONSUMER config to be fetched
 */
const CONSUMER = 'CONSUMER'

/**
 * The Notification config required
 *
 * This ENUM is for the notification message being created
 *
 * @typedef {object} ENUMS~NOTIFICATION
 * @property {string} NOTIFICATION - notification to be used to update metadata
 */
const NOTIFICATION = 'notification'

/**
 * The EVENT config required
 *
 * This ENUM is for the topic being created
 *
 * @typedef {object} ENUMS~EVENT
 * @property {string} EVENT - event to be used get the config for Kafka
 */
const EVENT = 'event'

/**
 * The STATE constant
 *
 * I believe that this is a temporary solution
 *
 * This ENUM is for the state of the message being created
 *
 * @typedef {object} ENUMS~STATE
 * @property {string} STATE - used for the state of the message
 */
const STATE = {
  SUCCESS: {
    status: 'success',
    code: 0,
    description: 'action successful'
  },
  FAILURE: {
    status: 'error',
    code: 999,
    description: 'action failed'
  }
}

/**
 * ENUMS
 *
 * Global ENUMS object
 *
 * @typedef {object} ENUMS
 * @property {string} PRODUCER - This ENUM is for the PRODUCER
 * @property {string} CONSUMER - This ENUM is for the CONSUMER
 */
exports.ENUMS = {
  PRODUCER,
  CONSUMER,
  NOTIFICATION,
  STATE,
  EVENT
}

// /**
//  * @method ParticipantTopicTemplate
//  *
//  * @param {string} participantName - participant name, retrieved from database. Example: 'dfsp1'
//  * @param {string} functionality - the functionality flow. Example: 'transfer'
//  * @param {string} action - the action that applies to the flow. Example: 'prepare'
//  *
//  * Generates a participant topic name from the 3 inputs which are used in the placeholder topic template for participants found in the default.json
//  *
//  * @returns {string} - Returns topic name to be created, throws error if failure occurs
//  */
// const participantTopicTemplate = (participantName, functionality, action) => {
//   try {
//     return Mustache.render(Config.KAFKA_CONFIG.TOPIC_TEMPLATES.PARTICIPANT_TOPIC_TEMPLATE.TEMPLATE, {
//       participantName,
//       functionality,
//       action
//     })
//   } catch (e) {
//     Logger.error(e)
//     throw e
//   }
// }

/**
 * @method FulfilTopicTemplate
 *
 * @description Generates a fulfil topic name found in the default.json
 *
 * @returns {string} - Returns topic name to be created, throws error if failure occurs
 */
const fulfilTopicTemplate = () => {
  try {
    return Mustache.render(Config.KAFKA_CONFIG.TOPIC_TEMPLATES.FULFIL_TOPIC_TEMPLATE.TEMPLATE)
  } catch (e) {
    Logger.error(e)
    throw e
  }
}

/**
 * @method FulfilTopicTemplate
 *
 * @description Generates a fulfil topic name found in the default.json
 *
 * @returns {string} - Returns topic name to be created, throws error if failure occurs
 */
const getTransferByidTopicTemplate = () => {
  try {
    return Mustache.render(Config.KAFKA_CONFIG.TOPIC_TEMPLATES.GET_TRANSFERS_TOPIC_TEMPLATE.TEMPLATE)
  } catch (e) {
    Logger.error(e)
    throw e
  }
}
/**
 * @method NotificationTopicTemplate
 *
 * @description Generates a notification topic name found in the default.json
 *
 * @returns {string} - Returns topic name to be created, throws error if failure occurs
 */
const notificationTopicTemplate = () => {
  try {
    return Mustache.render(Config.KAFKA_CONFIG.TOPIC_TEMPLATES.NOTIFICATION_TOPIC_TEMPLATE.TEMPLATE)
  } catch (e) {
    Logger.error(e)
    throw e
  }
}

/**
 * @method GetNotificationTopicName
 *
 * @returns {string} - Returns notification topic, throws error if failure occurs
 */
const getNotificationTopicName = () => {
  try {
    return notificationTopicTemplate()
  } catch (e) {
    Logger.error(e)
    throw e
  }
}

// /**
//  * @method GetParticipantName
//  *
//  * @param {string} accountUri - the accountUri
//  *
//  * Parses the accountUri into a participant name from the uri string
//  *
//  * @returns {string} - Returns participant name, throws error if failure occurs
//  */
// const getParticipantName = (accountUri) => {
//   try {
//     return UrlParser.nameFromAccountUri(accountUri)
//   } catch (e) {
//     Logger.error(e)
//     throw e
//   }
// }

// /**
//  * @method GetTopicNameFromURI
//  *
//  * @param {object} transfer - the transfer object used to get the accountUri from
//  * @param {string} functionality - the functionality flow. Example: 'transfer'
//  * @param {string} action - the action that applies to the flow. Example: 'prepare'
//  *
//  * Parses the accountUri into a participant name from the uri string
//  *
//  * @returns {string} - Returns participant name, throws error if failure occurs
//  */
// const getTopicNameFromURI = (transfer, functionality, action) => {
//   try {
//     const participantName = getParticipantName(transfer.debits[0].account)
//     return participantTopicTemplate(participantName, functionality, action)
//   } catch (e) {
//     Logger.error(e)
//     throw e
//   }
// }

/**
 * @method TransformGeneralTopicName
 *
 * @param {string} functionality - the functionality flow. Example: 'transfer'
 * @param {string} action - the action that applies to the flow. Example: 'prepare'
 *
 * @function generalTopicTemplate called which generates a general topic name from the 2 inputs,
 * which are used in the placeholder general topic template found in the default.json
 *
 * @returns {string} - Returns topic name to be created, throws error if failure occurs
 */
const transformGeneralTopicName = (functionality, action) => {
  try {
    return generalTopicTemplate(functionality, action)
  } catch (e) {
    throw e
  }
}

/**
 * @function GeneralTopicTemplate
 *
 * @description Generates a general topic name from the 2 inputs, which are used in the placeholder general topic template found in the default.json
 *
 * @param {string} functionality - the functionality flow. Example: 'transfer'
 * @param {string} action - the action that applies to the flow. Example: 'prepare'
 *
 * @returns {string} - Returns topic name to be created, throws error if failure occurs
 */
const generalTopicTemplate = (functionality, action) => {
  try {
    return Mustache.render(Config.KAFKA_CONFIG.TOPIC_TEMPLATES.GENERAL_TOPIC_TEMPLATE.TEMPLATE, { functionality, action })
  } catch (e) {
    Logger.error(e)
    throw e
  }
}

// /**
//  * @method GetParticipantTopicName
//  *
//  * @param {string} participantName - participant name, retrieved from database. Example: 'dfsp1'
//  * @param {string} functionality - the functionality flow. Example: 'transfer'
//  * @param {string} action - the action that applies to the flow. Example: 'prepare'
//  *
//  * @description participantTopicTemplate called which generates a participant topic name from the 3 inputs,
//  * which are used in the placeholder participant topic template found in the default.json
//  *
//  * @returns {string} - Returns topic name to be created, throws error if failure occurs
//  */
// const getParticipantTopicName = (participantName, functionality, action) => {
//   try {
//     return participantTopicTemplate(participantName, functionality, action)
//   } catch (e) {
//     throw e
//   }
// }

/**
 * @method GetFulfilTopicName
 *
 * @description fulfilTopicTemplate called which generates a fulfil topic name found in the default.json
 *
 * @returns {string} - Returns topic name to be created, throws error if failure occurs
 */
const getFulfilTopicName = () => {
  try {
    return fulfilTopicTemplate()
  } catch (e) {
    throw e
  }
}

/**
 * @method GetFulfilTopicName
 *
 * @description fulfilTopicTemplate called which generates a fulfil topic name found in the default.json
 *
 * @returns {string} - Returns topic name to be created, throws error if failure occurs
 */
const getTransferByIdTopicName = () => {
  try {
    return getTransferByidTopicTemplate()
  } catch (e) {
    throw e
  }
}

/**
 * @method GetKafkaConfig
 *
 * @param {string} flow - This is required for the config for the ML API ADAPTER. Example: 'CONSUMER' ie: note the case of text
 * @param {string} functionality - the functionality flow. Example: 'TRANSFER' ie: note the case of text
 * @param {string} action - the action that applies to the flow. Example: 'PREPARE' ie: note the case of text
 *
 * @returns {string} - Returns topic name to be created, throws error if failure occurs
 */
const getKafkaConfig = (flow, functionality, action) => {
  try {
    const flowObject = KafkaConfig[flow]
    const functionalityObject = flowObject[functionality]
    const actionObject = functionalityObject[action]
    actionObject.config.logger = Logger
    return actionObject.config
  } catch (e) {
    throw new Error('No config found for those parameters')
  }
}

/**
 * @function createGeneralTopicConf
 *
 * @param {string} participantName - The participant name
 * @param {string} functionality - the functionality flow. Example: 'transfer' ie: note the case of text
 * @param {string} action - the action that applies to the flow. Example: 'prepare' ie: note the case of text
 * @param {*} key - optional key to be sent on the message
 * @param {number} partition - optional partition to produce to
 * @param {*} opaqueKey - optional opaque token, which gets passed along to your delivery reports
 *
 * @returns {object} - Returns newly created general topicConfig
 */
const createGeneralTopicConf = (functionality, action, key = null, partition = null, opaqueKey = null) => {
  return {
    topicName: transformGeneralTopicName(functionality, action),
    key,
    partition,
    opaqueKey
  }
}

// exports.getParticipantTopicName = getParticipantTopicName
exports.getFulfilTopicName = getFulfilTopicName
exports.getKafkaConfig = getKafkaConfig
exports.getNotificationTopicName = getNotificationTopicName
exports.getTransferByIdTopicName = getTransferByIdTopicName
exports.createGeneralTopicConf = createGeneralTopicConf
