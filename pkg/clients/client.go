package clients

type IClient interface {
	Name() string
	Configure(v any)
}
