export const dataMessagingCards = [
  {
    title: 'RDS Fundamentals',
    body: `Managed relational database. MySQL, PostgreSQL, MariaDB, Oracle, SQL Server.
**AWS manages**: engine patches, underlying OS, backups, hardware.
**You manage**: access controls, parameter groups, encryption config, SGs.

**Multi-AZ**: synchronous replication to standby in separate AZ.
Failover: ~60–120s, automatic, DNS cutover (not IP change).
Standby is **NOT** queryable — it is a hot spare only.
Multi-AZ ≠ read scaling. Use **read replicas** for that.

**Read Replicas**: async replication, queryable, lag is possible.
Can be promoted to standalone — used in DR (Pilot Light pattern).
Up to 5 replicas per primary. Cross-region replicas supported.

**Encryption** must be enabled at creation. Cannot enable on existing instance.
Workaround: snapshot → copy encrypted → restore from encrypted snapshot.`,
  },
  {
    title: 'RDS Proxy',
    body: `Connection pooler that sits between application and RDS.
App connects to Proxy — Proxy maintains smaller pool to actual DB.

Solves **connection exhaustion** on small instance classes.
Lambda → RDS is the canonical problem: Lambda scales to thousands
of concurrent executions, each wanting its own connection.
Proxy absorbs the fan-out.

**Failover-aware**: Proxy handles Multi-AZ failover transparently.
App doesn't need to retry DNS — Proxy endpoint stays stable.
Reduces failover impact from ~60s to **~3s** for the application.`,
  },
  {
    title: 'ElastiCache',
    body: `Managed in-memory cache. **Redis** or **Memcached**.

**Redis**        persistence, replication, sorted sets, pub/sub, Lua scripts
**Memcached**    simpler, multi-threaded, pure cache — no persistence
             Default to Redis unless you specifically need thread scaling.

**Cache-aside** (lazy loading): app checks cache → miss → read DB → write cache.
Most common pattern. App owns cache population. Cold start = all misses.

**Write-through**: write to cache and DB together on every write.
Cache stays fresh. Write latency increases slightly.

**TTL**: controls expiry. Balance freshness vs hit rate.
No TTL = stale data accumulates. Too short = cache barely helps.`,
  },
  {
    title: 'DAX',
    body: `DynamoDB Accelerator — in-memory cache in front of DynamoDB.
**Microsecond** read latency vs single-digit millisecond from DynamoDB.
API-compatible with DynamoDB SDK — swap endpoint, same calls, no rewrite.
Write-through by default. Caches item reads and query results.

**Use when**: read-heavy, latency-sensitive, repeated reads of same items.
**Do not use when**: strongly consistent reads required (DAX serves eventually
consistent only), or write-heavy workloads with infrequent reads.`,
  },
  {
    title: 'SQS Fundamentals',
    body: `Managed message queue. Decouples producer from consumer.
Producer writes to queue. Consumer polls and processes. Async by design.

**Standard queue**: at-least-once delivery, best-effort ordering.
             High throughput, nearly unlimited TPS.
**FIFO queue**: exactly-once processing, strict order preserved.
             3,000 TPS with batching, 300 without.

**Visibility timeout**: hides message during processing.
Consumer must delete message before timeout expires.
If consumer crashes → message reappears after timeout → reprocessed.
Set timeout > max processing time to avoid duplicate processing.`,
  },
  {
    title: 'SQS — DLQ & Polling',
    body: `**DLQ** (Dead Letter Queue): captures messages that exceed maxReceiveCount.
Nothing disappears silently. Inspect and replay from DLQ.
Set maxReceiveCount based on retry tolerance — typically 3–5.
DLQ must be same type as source queue (FIFO → FIFO DLQ).

**Long polling**: SQS waits up to 20s for messages before returning empty.
Fewer empty responses, lower cost, lower latency than short polling.
Always prefer long polling. Set ReceiveMessageWaitTimeSeconds=20.

**Lambda → SQS**: Lambda polls the queue (event source mapping).
Lambda scales consumers based on queue depth automatically.
Batch size configurable — Lambda receives up to N messages per invocation.`,
  },
  {
    title: 'SNS & Fan-out',
    body: `**Pub/sub**: publish once to a topic, deliver to all subscribers.
Subscribers: SQS, Lambda, HTTP/S, email, SMS, mobile push.

SNS does **NOT** persist messages. No subscriber = message gone.
SNS → SQS gives you persistence + fan-out. Use this pattern.

**Fan-out**: one SNS publish → multiple SQS queues → independent consumers.
Each queue scales independently. Failure in one consumer doesn't
affect others. Standard pattern for event-driven microservices.

**Message filtering**: subscriber sets a filter policy on message attributes.
Each subscriber receives only the messages it cares about.
Avoids separate topics per consumer type.`,
  },
]
