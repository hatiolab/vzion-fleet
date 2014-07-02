Ext.define('Base.mixin.Tracer', {
	constructor : function(config) {
		function onTraceHandler(severity, msg, e) {
			var store = Ext.getStore('Base.store.Tracer');
			
			var client_trace = e instanceof Error ? msg + '\n' + printStackTrace({
				e: e
			}).join('\n') : msg;
			
			var resp = e.server_response || {};
			
			store.add({
				severity : severity,
				message : msg,
				trace : client_trace, 
				source_class : e ? e.sourceClass : '',
				source_method : e ? e.sourceMethod : '',
				source_file : e ? e.sourceFile : '',
				source_line : e ? e.sourceLine : '',
				issued_at : e ? e.issuedAt : new Date(),
				issued_by : e ? e.issuedBy : '',
				request_uri : (resp.request && resp.request.uri) ? resp.request.uri : '',
				request_params : (resp.request && resp.request.params) ? resp.request.params : {},
				server_throwable_type : (resp.throwable) ? resp.throwable.type : '',
				server_throwable_message : (resp.throwable) ? resp.throwable.message : '',
				server_throwable_trace : (resp.throwable) ? resp.throwable.stacktrace : ''
			});
		}
		
		function onError(msg, e) {
			onTraceHandler('error', msg, e);
		}
		function onWarn(msg, e) {
			onTraceHandler('warn', msg, e);
		}
		function onTrace(msg, e) {
			onTraceHandler('trace', msg, e);
		}
		function onInfo(msg, e) {
			onTraceHandler('info', msg, e);
		}
		
		HF.logger.on('error', onError);
		HF.logger.on('warn', onWarn);
		HF.logger.on('trace', onTrace);
		HF.logger.on('info', onInfo);
	}
});
