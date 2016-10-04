/**
 * PolymerWrapper eases binding event listeners to Polymer Component events,
 * primarily notify ({prop}-changed) events.
 * Since they need to be listened to via addEventListener and
 * ReactPolymer doesn't seem to be able to tell React that it should do this with such events,
 * this class uses a ref helper function to handle this case instead.
 *
 * This is only necessary when you need to bind to events.  If you're just setting
 * attributes, you don't need to bother.
 *
 * Usage:
 *  render() {
 *    return (
 *      <some-polymer-element
 *        some-value={this.props.foo}
 *        ref={this.polymerEvents(`somePolymerElement`, {
 *          'some-value-changed': event => {
 *            this.onSomeValueChanged( event.currentTarget.value )
 *          }
 *        })}/>
 *    );
 *  }
 *
 * Usage with iterated items:
 *  render() {
 *    return (
 *      <div className="items">
 *        {this.props.someArray.map(someItem => (
 *          <some-polymer-element
 *            key={someItem.id}
 *            some-value={someItem.foo}
 *            ref={this.polymerEvents(`somePolymerElement#${someItem.id}`, {
 *              'some-value-changed': event => {
 *                this.onSomeItemValueChanged(someItem.id, event.currentTarget.value)
 *              }
 *            })}/>
 *        ))}
 *      </div>
 *    );
 *  }
 *
 * Note that there's no additional parameters, just that the name is built
 * using some item key, probably the same one you use for the @key attr.
 *
 * Note also that you don't have to use a # in there.  The names are completely arbitrary.
 */

import React from 'react';

export default class PolymerWrapper extends React.Component {
  constructor( props ) {
    super( props );

    this.polymerComponents = new Map();
  }

  /**
   * Creates a RefFunction to bind events to a Polymer Component,
   * that RefFunction which then handles actually binding event handlers via
   * Element#addEventListener.
   *
   * @param  {String} The internal id to use for this binding.  Should be unique in this instance.
   * @param  {{[EventName: String]: Function EventHandler(Event) }} Object mapping event names to handlers.
   * @return {Function RefFunction(Ref)} The RefFunction actually used in React's @ref.
   */
  polymerEvents( componentName, events ) {
    return ref => {
      let has = key => this.polymerComponents.has( key );
      if( ref && ! has( componentName ) ) {
        this.registerPolymerComponent( componentName, events, ref );
      }
      else if( ! ref && has( componentName ) ) {
        this.unregisterPolymerComponent( componentName, events );
      }
      else if( ref && has( componentName ) ) {
        this.updatePolymerComponent( componentName, events, ref );
      }
    };
  }

  registerPolymerComponent( componentName, handlers, ref ) {
    this.polymerComponents.set( componentName, {
      ref,
      handlers,
      dispatchers: null
    });

    this.addPolymerEventListeners( componentName, handlers, ref );
  }

  updatePolymerComponent( componentName, handlers /*, ref*/ ) {
    let componentDef = this.polymerComponents.get( componentName );
    componentDef.handlers = handlers;
  }

  unregisterPolymerComponent( componentName, handlers ) {
    // TODO: Do we actually need to remove event listeners when an element is being removed?
    this.removePolymerEventListeners( componentName, handlers );
    this.polymerComponents.delete( componentName );
  }

  addPolymerEventListeners( componentName, handlers, ref ) {
    let componentDef = this.polymerComponents.get( componentName );
    let dispatchers = componentDef.dispatchers = componentDef.dispatchers || {};

    Object.keys( handlers ).forEach( eventName => {
      dispatchers[ eventName ] = event => this.dispatchPolymerRefEvent( componentName, eventName, event );
      ref.addEventListener( eventName, dispatchers[ eventName ] );
    });
  }

  removePolymerEventListeners( componentName, handlers ) {
    let componentDef = this.polymerComponents.get( componentName );
    let { dispatchers, ref } = componentDef;

    Object.keys( handlers ).forEach( eventName => {
      ref.removeEventListener( eventName, dispatchers[ eventName ] );
    });
  }

  dispatchPolymerRefEvent( componentName, eventName, event ) {
    let componentDef = this.polymerComponents.get( componentName );
    let { handlers } = componentDef;

    return handlers[ eventName ]( event );
  }
}
