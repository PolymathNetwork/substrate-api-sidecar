import { IAccountPendingAuthorizations } from 'src/types/responses';

import { AbstractService } from '../AbstractService';

export class AccountsPendingAuthorizationsService extends AbstractService {
	/**
	 * Fetch pending authorizations for an account.
	 *
	 * @param address Address to check for pending authorizations.
	 */
	async fetchAccountPendingAuthorizations(
		address: string
	): Promise<IAccountPendingAuthorizations> {
		const { api } = this;

		const pendingAuths = await api.rpc['identity'].getFilteredAuthorizations(
			{ Account: address },
			true,
			'JoinIdentity',
		);
		  
		const ids = pendingAuths.map(({ auth_id }: any) => auth_id.toNumber());
		  
		return {
		  auths: ids,
		};
	}
}
