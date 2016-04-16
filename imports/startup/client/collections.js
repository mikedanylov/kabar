/**
 * Created by mikedanylov on 4/16/16.
 */

import { Mongo } from 'meteor/mongo';

/**
 * create Songs collection on a client as well
 */
export const Songs = new Mongo.Collection('songs');
/**
 * create Places collection on a client as well
 */
export const Places = new Mongo.Collection('places');
/**
 * create Orders collection on a client as well
 */
export const Orders = new Mongo.Collection('orders');
