import { Conventions, EventEvent, initializeFaro, TransportItem } from '@grafana/faro-core';
import { mockConfig, MockTransport } from '@grafana/faro-core/src/testUtils';

import { createSession } from '../../session';
import { SessionInstrumentation } from './instrumentation';

describe('SessionInstrumentation', () => {
  it('will send session start event on initialize', () => {
    const transport = new MockTransport();
    const session = createSession({ foo: 'bar' });
    const config = mockConfig({
      transports: [transport],
      instrumentations: [new SessionInstrumentation()],
      session,
    });

    initializeFaro(config);

    expect(transport.items).toHaveLength(1);

    const event = transport.items[0]! as TransportItem<EventEvent>;
    expect(event.payload.name).toEqual(Conventions.EventNames.SESSION_START);
    expect(event.meta.session?.attributes).toEqual({ foo: 'bar' });
    expect(event.meta.session?.id).toEqual(session.id);
  });

  it('will send session new start event if setSession is called.', () => {
    const transport = new MockTransport();
    const session = createSession({ foo: 'bar' });
    const config = mockConfig({
      transports: [transport],
      instrumentations: [new SessionInstrumentation()],
      session,
    });

    const faro = initializeFaro(config);

    expect(transport.items).toHaveLength(1);

    let event = transport.items[0]! as TransportItem<EventEvent>;
    expect(event.payload.name).toEqual(Conventions.EventNames.SESSION_START);
    expect(event.meta.session?.id).toEqual(session.id);

    faro.metas.add({ user: { id: 'foo' } });
    expect(transport.items).toHaveLength(1);

    const newSession = createSession();
    faro.api.setSession(newSession);
    expect(transport.items).toHaveLength(2);

    event = transport.items[0]! as TransportItem<EventEvent>;
    expect(event.meta.session?.id).toEqual(session.id);
  });
});
